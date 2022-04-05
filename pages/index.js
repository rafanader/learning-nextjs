import React from 'react';
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useRouter } from 'next/router';

import themeConfig from '../theme.json'

function Title(props) {
    const Tag = props.tag || 'h1'
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${themeConfig.theme.colors.neutrals['000']};
                    font-weight: 600;
                }
            `}
            </style>
        </>
    );
}

function FollowerRibbon(props) {
    return (
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '80px',
                flex: 1
            }}
        >
            <Image
                styleSheet={{
                    width: '80%',
                    borderRadius: '50%',
                    border: '1px solid',
                    'border-color': themeConfig.theme.colors.neutrals[800]
                }}
                src={`https://github.com/${props.userlogin}.png`}
            />
            <Text
                variant="body4"
                styleSheet={{
                    color: themeConfig.theme.colors.neutrals[300],
                    padding: '3px 10px',
                }}
            >
                {props.userlogin}
            </Text>
        </Box>                                   
    )
}

export default function Index() {
    const defaultUserData = { 
        "login": "rafanader",
        "name": "Rafael Nader",
        "followers_url": `https://api.github.com/users/rafanader/followers`
    };

    const followersQnty = 3;
    const routerControl = useRouter();

    const [userLoginText, setUserLoginText] = React.useState('');
    const [userLogin, setUserLogin] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [submitDisabled, setSubmitDisabled] = React.useState(true);
    const [followers, setFollowers] = React.useState([]);

    //ShowGitHubUserData(defaultUserData);

    async function LoadGithubUserData(_userLoginText) {
        ToggleFormStatus(false);

        if (_userLoginText.length > 2) 
        {
            let userGHData = await FetchAPI(`https://api.github.com/users/${_userLoginText}`);

            if (userGHData != undefined && userGHData !== '') //User exists
            {
                ShowGitHubUserData(userGHData);
            }
        }
    }

    async function ShowGitHubUserData(userGHData)
    {
        setUserName(userGHData.name);
        setUserLogin(userGHData.login);
        ToggleFormStatus(true);

        LoadAndShowGitHubUserFollowers(userGHData);
    }

    async function LoadAndShowGitHubUserFollowers(_userGHData) {

        let userGHFollowersData = await FetchAPI(_userGHData.followers_url);
        if (userGHFollowersData != undefined) //User Followers exists
        {
            ShowGitHubUserFollowers(userGHFollowersData);
        }
        else 
            setFollowers([]);
    }

    async function ShowGitHubUserFollowers(_followersList) {   
        let quantity = (_followersList.length < followersQnty) ? _followersList.length : followersQnty;
        setFollowers(_followersList.slice(0, quantity));
    }

    function ToggleFormStatus(enable) {
        setSubmitDisabled(!enable);
    }
    
    async function FetchAPI(_urlAPI) 
    {
        console.log('Calling API ', _urlAPI);

        const response = await fetch(_urlAPI);
        if (response.status === 200) {
            let resp = response.json();
            console.log('Data returned: ', resp);
            return resp;
        } 

        return response.statusText;
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: themeConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '2px', padding: '16px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: themeConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function OnSubmitHandler(event) {
                            event.preventDefault();
                            routerControl.push('/chat');
                        }
                        }
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Seja bem vindo(a)!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: themeConfig.theme.colors.neutrals[300] }}>
                            {themeConfig.name}
                        </Text>

                        <TextField
                            value={userLoginText}
                            onChange={function onChangeHandler(event) {

                                let login = event.target.value;
                                setUserLoginText(login);
                                LoadGithubUserData(login);
                            }}
                            styleSheet={{ 'text-align': 'center' }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: themeConfig.theme.colors.neutrals[200],
                                    mainColor: themeConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: themeConfig.theme.colors.primary[500],
                                    backgroundColor: themeConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />

                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: themeConfig.theme.colors.neutrals["000"],
                                mainColor: themeConfig.theme.colors.primary[500],
                                mainColorLight: themeConfig.theme.colors.primary[400],
                                mainColorStrong: themeConfig.theme.colors.primary[600],
                            }}
                            disabled={submitDisabled}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: submitDisabled ? 'none' : 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '300px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                maxWidth: '100%',
                                flex: 1
                            }}
                        >
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: themeConfig.theme.colors.neutrals[200],
                                    backgroundColor: themeConfig.theme.colors.neutrals[900],
                                    padding: '3px 10px',
                                    marginBottom: '5px',
                                    borderRadius: '1000px'
                                }}
                            >
                                {userName}
                            </Text>
                            <Image
                                styleSheet={{
                                    maxWidth: '50%',
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    borderColor: themeConfig.theme.colors.neutrals[200]
                                }}
                                src={`https://github.com/${userLogin}.png`}
                            />
                        </Box>
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: themeConfig.theme.colors.neutrals[200],
                                padding: '20px 0px 10px 3px',
                                width: '100%',
                            }}
                        >
                            Principais Seguidores:
                        </Text>
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: '100%',
                                flex: 1
                            }}
                        >
                            {
                                followers.map( ( user, index) => {      
                                    return (<FollowerRibbon userlogin={`${user.login}`} key={index} />)
                                })
                            }
                        </Box>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
    
}