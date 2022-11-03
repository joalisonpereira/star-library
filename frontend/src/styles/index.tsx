import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    height: 100%;
    background-color: ${(props) => props.theme.basic};
    font-family: 'Montserrat', sans-serif;
  }
`;
