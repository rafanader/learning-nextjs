
import themeConfig from '../theme.json'

function GlobalStyle() {
    return (
      <style global jsx>{`
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
        html, body, #__next {
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
      `}</style>
    );
  }

function Titulo(props){
    const Tag = props.tag
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${themeConfig.theme.colors.neutrals[500]};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}
            </style>
        </>
    );
}

function HomePage() {
    return (
        <div>
            <GlobalStyle/>
            <Titulo tag="h2">Seja Bem Vindo(a)!</Titulo>
            <h2>Primeiro Projeto em React - Chat Imersão Alura</h2>
        </div>
    )
  }
  
  export default HomePage