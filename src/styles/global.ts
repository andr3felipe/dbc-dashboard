import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  -webkit-font-smoothing: antialiased;
  height: 100vh;
  height: 100dvh; 
  color: ${({ theme }) => theme.colors.text};
  
  background: ${({ theme }) => theme.colors.background};
}`;
