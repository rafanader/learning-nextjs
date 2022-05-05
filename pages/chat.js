import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import themeConfig from '../theme.json';

export default function ChatPage() {
    const [messagesList, setMessagesList] = React.useState([
        {
            username: 'omariosouto',
            datetime: '01/04/2022 08:21:21',
            text: 'message text 3',
            id: 2
        },
        {
            username: 'peas',
            datetime: '01/04/2022 08:20:20',
            text: 'message text 2',
            id: 1
        },
        {
            username: 'rafanader',
            datetime: '01/04/2022 08:19:19',
            text: 'message text',
            id: 0
        },
    ]);

    const [messageText, setMessageText] = React.useState("");

    function MessageTextKeyPressHandler(event) 
    {
        setMessageText(event.target.value);
        //Shift + Enter to send the message
        if (
            event.shiftKey &&
            event.key.toUpperCase() == 'ENTER'
        ) 
        {
            NewMessage(messageText);
            
            event.preventDefault();            
        }
    }

    function NewMessage(_messageText) 
    {
        const currentUser = 'rafanader'

        const newMessage = {
            username: currentUser,
            datetime: new Date().toLocaleString('pt-br'),//.substring(0, 16),
            text: _messageText,
            id: messagesList.length
        };
        
        setMessagesList([newMessage, ...messagesList]);
        setMessageText("");        
    }
        
    function DeleteMessage(messageId) 
    {
        const newList = messagesList.filter((item) => item.id != messageId);
        setMessagesList(newList);
    }

    return (
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                borderRadius: '2px',
                backgroundColor: themeConfig.theme.colors.neutrals[700],
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
                    backgroundColor: themeConfig.theme.colors.neutrals[900],
                    flexDirection: 'column',
                    borderRadius: '2px',
                    padding: '16px',
                }}
            >
                <Box
                    tag="ul"
                    styleSheet={{
                        overflow: 'hidden',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column-reverse',
                        color: themeConfig.theme.colors.neutrals['000'],
                        marginBottom: '16px',
                    }}
                >
                    {
                        Array.from(messagesList).map((message, index) => {
                            message.id = index;
                            return <MessageComponent key={index} message={message} />
                        })
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
                        type="textarea"
                        styleSheet={{
                            width: '100%',
                            border: '0',
                            resize: 'none',
                            borderRadius: '5px',
                            padding: '6px 8px',
                            backgroundColor: themeConfig.theme.colors.neutrals[800],
                            //marginRight: '12px',
                            color: themeConfig.theme.colors.neutrals[200],
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
    
    function MessageComponent(props) {
        const message = props.message
        let messageBGColor = themeConfig.theme.colors.neutrals[500]

        if (message.id % 2)
            messageBGColor = themeConfig.theme.colors.neutrals[700]

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
                    <Image
                        alt={`${message.username} profile image`}
                        styleSheet={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${message.username}.png`}
                    />
                    <Text
                        tag="strong"
                        styleSheet={{
                            fontSize: '14px',
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            color: themeConfig.theme.colors.primary[400],
                            width: '100%',
                        }}
                    >
                        {message.username}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '11px',
                            color: themeConfig.theme.colors.neutrals[300],
                            textAlign: 'right',
                            width: '130px',
                            marginTop: '5px',
                            marginRight: '5px',
                        }}
                        tag="span"
                    >
                        {message.datetime}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '11px',
                            color: themeConfig.theme.colors.primary[500],
                            textAlign: 'right',
                            width: '30px',
                            marginTop: '5px',
                            marginRight: '5px',
                            cursor: 'pointer'
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
                            color: themeConfig.theme.colors.neutrals[200],
                        }}
                        tag="span"
                    >
                        {message.text}
                    </Text>
                </Box>
            </Text>
        )
    }
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

