import { Box, Text, TextField, Image, Button } from '@skynexui/components'

import * as config from '../configurations/general'

function GlobalStyle() {
    return (
        <style global jsx>
            {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    list-style: none;
                }
                body {
                    font-family: 'Open Sans', sans-serif;
                }
                /* App fit Height */
                html,
                body,
                #__next {
                    min-height: 100vh;
                    display: flex;
                    flex: 1;
                }
                #__next {
                    flex: 1;
                }
                #__next > * {
                    flex: 1;
                }
                /* ./App fit Height */
            `}
        </style>
    )
}

export default function CustomApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: config.theme.colors.primary[500],
                    backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                    color: config.theme.colors.neutrals['000'],
                }}
            >
                <Component {...pageProps} />
            </Box>
        </>
    )
}
