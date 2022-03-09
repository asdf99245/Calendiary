import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MaruBuri-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/MaruBuri-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  *,html,body {
    box-sizing: border-box;
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
    font-family: 'MaruBuri-Regular';
  }
`;

export default GlobalStyle;
