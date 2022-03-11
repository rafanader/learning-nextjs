import React from 'react';
import { Box, Button, Text, TextField, Image} from '@skynexui/components'
import { useRouter } from 'next/router';

import themeConfig from '../theme.json'

function Title(props){
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
  
  const [usernameText, setUsernameText] = React.useState('rafanader');
  const [username, setUsername] = React.useState('rafanader');
  const routerControl = useRouter();
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  
  function FormSubmitControl(userNameText) {
    
    setSubmitDisabled( (userNameText.length < 3) );

    if (userNameText.length > 2) {
      setUsername(userNameText);
    }
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
            borderRadius: '5px', padding: '32px', margin: '16px',
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
                
                let userNameText = event.target.value;
                setUsernameText(userNameText);
                FormSubmitControl(userNameText);
              }}
              styleSheet={{'text-align':'center'}}
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
              padding: '16px',
              backgroundColor: themeConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: themeConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
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
                backgroundColor: themeConfig.theme.colors.neutrals[100],
                border: '1px solid',
                borderColor: themeConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1
              }}
            >
              <Text
                variant="body4"
                styleSheet={{
                  color: themeConfig.theme.colors.neutrals[200],
                  backgroundColor: themeConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
              <Image
                styleSheet={{
                  maxWidth: '70%',
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
            </Box>
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100%',
                backgroundColor: themeConfig.theme.colors.neutrals[500],
                border: '1px solid',
                borderColor: themeConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1
              }}
            >
              <Image
                styleSheet={{
                  width: '80px',
                  borderRadius: '50%',
                  marginTop: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: themeConfig.theme.colors.neutrals[200],
                  backgroundColor: themeConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}