import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';

import * as configs from '../configurations/general'

export function GitHubCard(props) {
  const [isOpen, setOpenState] = React.useState('');
  const [timeoutId, setTimeoutId] = React.useState(0);

    function StateControl(close){
        var timeoutIdTemp = null;
        if(close) {
            if(timeoutId > 0)
                clearTimeout(timeoutId);
            
            timeoutIdTemp = setTimeout( () => {
                setOpenState(false);
                setTimeoutId(0);
            }, 500);

            setTimeoutId(timeoutIdTemp);
        }
        else {
            clearTimeout(timeoutId);
            setOpenState(true);
        }    
    }

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          background: `url(https://github.com/${props.username}.png)`,
          backgroundSize: '100%',
          marginRight: '8px',
          display: 'inline-block'
        }}
        onMouseOver={() => StateControl(false)}
        onMouseOut={() => StateControl(true)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: configs.theme.colors.neutrals[800],
            width: {
              xs: '270px',
              sm: '350px',
            },
            height: '130px',
            left: '40px',
            top: '-30px',
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onMouseOver={() => StateControl(false)}
          onMouseOut={() => StateControl(true)}
        >
          <Box                    
            styleSheet={{
                display: 'flex',
                flexDirection: 'row',
            }}
            >
                <Image
                    alt={`${props.username}'s github profile image`}
                    styleSheet={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '8px',
                    }}
                    src={`https://github.com/${props.username}.png`}
                />
                <Box>
                    <Text
                        tag="strong"
                        styleSheet={{
                            fontSize: '18px',
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            color: configs.theme.colors.primary[400],
                            width: '100%',
                            fontWeight: '600'
                        }}
                    >
                        {props.username}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '13px',
                            color: configs.theme.colors.neutrals[300],
                            width: '100%',
                            marginTop: '5px',
                            hover: {
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }
                        }}
                        tag="a"
                        onClick={() => {
                            window.open(`https://github.com/${props.username}`);
                        }}
                    >
                       {props.username}&apos;s GitHub profile page
                    </Text>
                </Box>
            </Box>
        </Box>
      )}
    </Box>
  )
}