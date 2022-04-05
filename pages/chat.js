import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';

import themeConfig from '../theme.json'

export default function ChatPage() {

    let exampleMessagesList = [ {
            username: "rafanader",
            datetime: '01/04/2022 08:21',
            text: 'message text',
            id: 1
        },
        {
            username: "peas",
            datetime: '01/04/2022 08:20',
            text: 'message text 2',
            id: 2
        },
        {
            username: "omariosouto",
            datetime: '01/04/2022 08:19',
            text: 'message text 3',
            id: 3
        }
    ];

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: themeConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: themeConfig.theme.colors.neutrals['000']
            }}
        >
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
                            //overflow: 'scroll',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            flex: 1,
                            color: themeConfig.theme.colors.neutrals["000"],
                            marginBottom: '16px',
                        }}
                    >
                        <MessageList messages={exampleMessagesList} />
                    </Box>
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    let components = [];

    for (let i = 0; i < props.messages.length; i++)
    {
        let message = props.messages[i];
        let messageBGColor = themeConfig.theme.colors.neutrals[500];

        if(i % 2)
            messageBGColor = themeConfig.theme.colors.neutrals[700];
        
        components.push(<MessageComponent key={message.id} username={message.username} datahora={message.datetime} text={message.text} backgroundColor={messageBGColor} />);
    }

    return(components);
}

function MessageComponent(message) {

    return (
            <Text
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginTop: '5px',
                    backgroundColor: message.backgroundColor//,
                    // hover: {
                    //     backgroundColor: themeConfig.theme.colors.neutrals[700],
                    // }
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${message.username}.png`}
                    />
                    <Text tag="strong"
                        styleSheet={{
                            fontSize: '14px',
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            color: themeConfig.theme.colors.primary[400],
                            width: '100%'
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
                            marginRight: '5px'
                        }}
                        tag="span"
                    >
                        {message.datahora}
                    </Text>
                </Box>
                <Box
                    styleSheet={{
                        //marginBottom: '8px',
                    }}
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