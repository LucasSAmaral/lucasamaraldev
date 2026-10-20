'use client';
import { createGlobalStyle } from 'styled-components';
import { colors, fonts } from './theme';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: ${colors.background};
  color: ${colors.text};
  font-family: ${fonts.body};
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

button,
input,
textarea,
select {
  font: inherit;
  color: inherit;
}

:focus-visible {
  outline: 2px solid ${colors.accent};
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export default GlobalStyle;
