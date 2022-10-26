import React from 'react';
import { useRouter } from 'next/router'
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js'

import * as configs from '../configurations/general';
import { GitHubCard } from '../components/gitHubCard.js'

const supabaseConfigs = configs.appkeys.SUPABASE;

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(supabaseConfigs.URL, supabaseConfigs.API_ANON_KEY);


export default function ChatPage() {
       
    const [messagesList, setMessagesList] = React.useState([]);
    const [messageText, setMessageText] = React.useState("");
    const [timeoutId, setTimeoutId] = React.useState(0);
    const routerControl = useRouter();

    React.useEffect(() => {
        RefreshMessagesList()
    }, []);

    function RefreshMessagesList() {
        console.log('Refreshing messages...')
        const timerId = setTimeout(() => {
            LoadMessages();
        }, 1000);

        setTimeoutId(timerId);
    }

    async function LoadMessages() {
        const response = await supabaseClient
            .from('tblMessages')
            .select('*')
            .order('datetime', { ascending: false} );

        setMessagesList(response.data);
    }

    function MessageTextKeyPressHandler(event) {
        setMessageText(event.target.value);
        //Shift + Enter to send the message
        if (
            event.shiftKey &&
            event.key.toUpperCase() == 'ENTER'
        ) {
            NewMessage(messageText);

            event.preventDefault();
        }
    }

    function NewMessage(_messageText) {
        const currentUser = routerControl.query.username;

        const newMessage = {
            username: currentUser,
            datetime: new Date(),
            text: _messageText
        };

        setMessageText("");
        InsertMessage(newMessage);
    }

    async function InsertMessage(message) {
        if(timeoutId > 0)
            clearTimeout(timeoutId);

        //Insert message in Supabase
        const response = await supabaseClient.from("tblMessages")
            .insert(message);
        
        LoadMessages();
    }

    async function DeleteMessage(messageId) {
        const response = await supabaseClient.from("tblMessages")
            .delete()
            .match({id : messageId});
        
        console.log('delete response for id ' + messageId + ': ', response);
        LoadMessages();
    }

    function FormatDateTime(utcDateTime) {
        const timeZoneDifference = -3;

        const year = utcDateTime.substr(0, 4);
        const month = FormatNumberLessTen(utcDateTime.substr(5, 2));
        const day = FormatNumberLessTen(utcDateTime.substr(8, 2));

        let hour = parseInt(utcDateTime.substr(11, 2)) + timeZoneDifference;
        if(hour < 0)
            hour = 24 + hour;
        
        const minute = FormatNumberLessTen(utcDateTime.substr(14, 2));
        const second = FormatNumberLessTen(utcDateTime.substr(17, 2));
        
        const formatedDt = FormatNumberLessTen(hour) + ":" + minute + ":" + second;
        //const formatedDt = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;

        return formatedDt;
    }

    function FormatNumberLessTen(number) {
        if(parseInt(number) < 10)
            number = '0' + parseInt(number);
        
        return number;
    }
    
    function MessageComponent(props) {
        const message = props.message
        let messageBGColor = configs.theme.colors.neutrals[500]

        if (message.id % 2)
            messageBGColor = configs.theme.colors.neutrals[700]

        const formatedDt = FormatDateTime(message.datetime);        

        return (
            <Text
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginTop: '5px',
                    backgroundColor: messageBGColor,
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <GitHubCard username={message.username} />
                     <Text
                        tag="strong"
                        styleSheet={{
                            fontSize: '14px',
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            color: configs.theme.colors.primary[400],
                            width: '100%',
                        }}
                    >
                        {message.username}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '11px',
                            color: configs.theme.colors.neutrals[300],
                            textAlign: 'right',
                            width: '130px',
                            marginTop: '5px',
                            marginRight: '5px',
                        }}
                        tag="span"
                    >
                        { formatedDt }
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '11px',
                            color: configs.theme.colors.primary[500],
                            textAlign: 'right',
                            width: '30px',
                            marginTop: '5px',
                            marginRight: '5px',
                            hover: {
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '12px',
                                color: configs.theme.colors.primary[300]
                            }
                        }}
                        tag="a"
                        onClick={() => {
                            DeleteMessage(message.id);
                        }}
                    >
                        [ X ]
                    </Text>
                </Box>
                <Box
                    styleSheet={
                        {
                            //marginBottom: '8px',
                        }
                    }
                >
                    <Text
                        styleSheet={{
                            fontSize: '14px',
                            padding: '8px',
                            color: configs.theme.colors.neutrals[200],
                        }}
                        tag="span"
                    >
                        {message.text}
                    </Text>
                </Box>
            </Text>
        )
    }

    return (
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                borderRadius: '2px',
                backgroundColor: configs.theme.colors.neutrals[700],
                height: '100%',
                maxWidth: '95%',
                maxHeight: '95vh',
                padding: '16px',
            }}
        >
            <Header />
            <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flex: 1,
                    height: '80%',
                    backgroundColor: configs.theme.colors.neutrals[900],
                    flexDirection: 'column',
                    borderRadius: '2px',
                    padding: '16px',
                }}
            >
                <Box
                    tag="ul"
                    styleSheet={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column-reverse',
                        color: configs.theme.colors.neutrals['000'],
                        marginBottom: '16px',
                    }}
                >
                    {
                        (messagesList.length > 0) && (
                            Array.from(messagesList).map((message, index) => {
                                return <MessageComponent key={index} message={message} />
                            })
                        )
                    }

                </Box>
                <Box
                    as="form"
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        value={messageText}
                        onChange={(event) => {
                            setMessageText(event.target.value);
                        }}
                        onKeyPress={(event) => MessageTextKeyPressHandler(event)}
                        placeholder="type your message and press SHIFT+ENTER to send"
                        id="messageTextArea"
                        type="textarea"
                        styleSheet={{
                            width: '100%',
                            border: '0',
                            resize: 'none',
                            borderRadius: '5px',
                            padding: '6px 8px',
                            backgroundColor: configs.theme.colors.neutrals[800],
                            //marginRight: '12px',
                            color: configs.theme.colors.neutrals[200],
                        }}
                    />
                    <Button
                        colorVariant="positive"
                        iconName="arrowRight"
                        label=" "
                        size="xl"
                        type='button'
                        styleSheet={{
                            marginBottom: '8px'
                        }}
                        onClick={() => NewMessage(messageText)}
                    />
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: '100%',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text variant="heading5">Chat</Text>
                <Button
                    variant="tertiary"
                    colorVariant="neutral"
                    label="Logout"
                    href="/"
                />
            </Box>
        </>
    )
}

