import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  *,html,body {
    box-sizing: border-box;
    font-family: 'BMJUA';
  }

  html,body {
    height:100%;
  }
  
  *{
    letter-spacing: 1px;
    ::-webkit-scrollbar {
    width: 10px; 
    }
    ::-webkit-scrollbar-thumb {
      background-color: #a1a1a1;
      border-radius: 6px;
      background-clip: content-box;
      border: 2px solid transparent;
    }
  }
  
  body {
    color:${({ theme }) => theme.colors.base};
    padding:0;
    margin:0;
    display:flex;
    flex-direction:column;
  }
`;

export default GlobalStyle;
