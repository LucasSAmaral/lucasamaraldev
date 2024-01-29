"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #4c5665;
  color: #fffffe;
  overflow: hidden;
}
`;

export default GlobalStyle;
