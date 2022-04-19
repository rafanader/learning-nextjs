import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'

import themeConfig from '../theme.json'

export default function ChatPage() {
    const [messageText, setMessageText] = React.useState('oi')
    const [messagesList, setMessagesList] = React.useState([
        {
            username: 'rafanader',
            datetime: '01/04/2022 08:21',
            text: 'message text',
            id: 1,
        },
        {
            username: 'peas',
            datetime: '01/04/2022 08:20',
            text: 'message text 2',
            id: 2,
        },
        {
            username: 'omariosouto',
            datetime: '01/04/2022 08:19',
            text: 'message text 3',
            id: 3,
        },
    ])

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
                        //overflow: 'scroll',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        flex: 1,
                        color: themeConfig.theme.colors.neutrals['000'],
                        marginBottom: '16px',
                    }}
                >
                    <MessageList
                        messages={Array.from(messagesList).reverse()}
                    />
                </Box>
                <Box
                    as="form"
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        placeholder="type your message and press SHIFT+ENTER to send"
                        type="textarea"
                        styleSheet={{
                            width: '100%',
                            border: '0',
                            resize: 'none',
                            borderRadius: '5px',
                            padding: '6px 8px',
                            backgroundColor:
                                themeConfig.theme.colors.neutrals[800],
                            //marginRight: '12px',
                            color: themeConfig.theme.colors.neutrals[200],
                        }}
                        value={messageText}
                        onKeyPress={function MessageTextKeyPressHandler(event) {
                            //Shift + Enter to send the message
                            if (
                                event.shiftKey &&
                                event.key.toUpperCase() == 'ENTER'
                            ) {
                                const messageTyped = event.target.value.trimEnd()
                                NewMessage(messageTyped)
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )

    function NewMessage(messageTyped) {
        const currentUser = 'rafanader'

        const message = {
            username: currentUser,
            datetime: new Date().toLocaleString('pt-br'),
            text: messageTyped,
            id: messagesList.length,
        }
        setMessageText('aaa')
        messagesList.push(message)
        console.log(message, 'lista: ', messagesList)
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

function MessageList(props) {
    return props.messages.map((message, index) => {
        message.index = index
        return <MessageComponent key={index} message={message} />
    })
}

function MessageComponent(props) {
    const message = props.message
    let messageBGColor = themeConfig.theme.colors.neutrals[500]

    if (message.index % 2)
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
