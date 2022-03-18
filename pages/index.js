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

export default function Index() {
    const defaultUser = 'rafanader';
    const followersQnty = 3;
    const routerControl = useRouter();

    const [usernameText, setUserLoginText] = React.useState(defaultUser);
    const [userLogin, setUserLogin] = React.useState(defaultUser);
    const [username, setUsername] = React.useState('');
    const [submitDisabled, setSubmitDisabled] = React.useState(true);
    const [followers, setFollowers] = React.useState([]);

    // LoadGithubUserData(defaultUser);

    async function LoadGithubUserData(_userLogin) {
        ToggleFormStatus(false);

        if (_userLogin.length > 2) 
        {
            let userGHData = await FetchAPI(`https://api.github.com/users/${_userLogin}`);

            if (userGHData != undefined && userGHData !== '') //User exists
            {
                setUsername(userGHData.name);
                setUserLogin(userGHData.login);
                ToggleFormStatus(true);

                LoadAndShowGitHubUserFollowers(userGHData);
            }
        }
    }

    async function LoadAndShowGitHubUserFollowers(_userGHData) {
        let userGHFollowersData = await LoadGitHubUserFollowers(_userGHData.followers_url);

        if (userGHFollowersData != undefined) //User Followers exists
        {
            ShowGitHubUserFollowers(userGHFollowersData);
        }
        else 
            setFollowers([]);
    }

    async function LoadGitHubUserFollowers(_followersUrl) {
        return await FetchAPI(_followersUrl);
    }

    function ShowGitHubUserFollowers(_followersList) {
        
        let quantity = (_followersList.length < followersQnty) ? _followersList.length : followersQnty;
        const tempArr = [];

        for(let i=0; i<quantity; i++) {
            tempArr.push( { 
                key: _followersList[i].login,
                login: _followersList[i].login
            });
        }

        setFollowers(tempArr);
    }

    function ToggleFormStatus(enable) {
        setSubmitDisabled(!enable);
    }
    
    async function FetchAPI(_urlAPI) 
    {
        console.log('Caliing API ', _urlAPI);

        const response = await fetch(_urlAPI);
        if (response.status === 200) {
            console.log('Data returned: ', response.json);
            return response.json();
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
                        borderRadius: '5px', padding: '16px', margin: '16px',
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
                            value={usernameText}
                            onChange={function onChangeHandler(event) {

                                let userLoginText = event.target.value;
                                setUserLoginText(userLoginText);
                                LoadGithubUserData(userLoginText);
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
                                    'margin-bottom': '5px',
                                    borderRadius: '1000px'
                                }}
                            >
                                {username}
                            </Text>
                            <Image
                                styleSheet={{
                                    maxWidth: '50%',
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    'border-color': themeConfig.theme.colors.neutrals[200]
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
                                followers.map(user => {
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
                                                src={`https://github.com/${user.login}.png`}
                                            />
                                            <Text
                                                variant="body4"
                                                styleSheet={{
                                                    color: themeConfig.theme.colors.neutrals[300],
                                                    padding: '3px 10px',
                                                }}
                                            >
                                                {user.login}
                                            </Text>
                                        </Box>                                   
                                    )
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