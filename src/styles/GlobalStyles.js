import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.gray.lightest};
    color: ${theme.colors.secondary.darkest};
    line-height: ${theme.lineHeight.normal};
    font-size: ${theme.fontSize.base};
    font-weight: ${theme.fontWeight.normal};
  }

  code {
    font-family: 'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primary.dark};
    }
  }

  button {
    font-family: inherit;
    font-weight: ${theme.fontWeight.medium};
  }

  input, textarea, select {
    font-family: inherit;
    font-weight: ${theme.fontWeight.normal};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.fontWeight.semibold};
    line-height: ${theme.lineHeight.tight};
    color: ${theme.colors.secondary.darkest};
  }

  h1 {
    font-size: ${theme.fontSize['4xl']};
  }

  h2 {
    font-size: ${theme.fontSize['3xl']};
  }

  h3 {
    font-size: ${theme.fontSize['2xl']};
  }

  h4 {
    font-size: ${theme.fontSize.xl};
  }

  h5 {
    font-size: ${theme.fontSize.lg};
  }

  h6 {
    font-size: ${theme.fontSize.base};
  }

  p {
    line-height: ${theme.lineHeight.relaxed};
    color: ${theme.colors.secondary.darker};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary.lighter};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondary.medium};
    border-radius: ${theme.borderRadius.full};
    transition: background ${theme.transitions.fast};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary.base};
  }

  ::selection {
    background-color: ${theme.colors.primary.light};
    color: ${theme.colors.primary.deep};
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.primary.main};
    outline-offset: 2px;
    border-radius: ${theme.borderRadius.sm};
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea {
    &::placeholder {
      color: ${theme.colors.secondary.base};
      font-weight: ${theme.fontWeight.normal};
    }
  }

  button {
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  a {
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary.main};
      outline-offset: 2px;
      border-radius: ${theme.borderRadius.sm};
    }
  }

  ul, ol {
    padding-left: ${theme.spacing.lg};
  }

  li {
    margin-bottom: ${theme.spacing.xs};
    line-height: ${theme.lineHeight.relaxed};
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.secondary.light};
  }

  th {
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.secondary.darkest};
    background-color: ${theme.colors.secondary.lightest};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius.md};
  }

  code {
    background-color: ${theme.colors.secondary.lighter};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.secondary.darkest};
  }

  pre {
    background-color: ${theme.colors.secondary.lighter};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    
    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid ${theme.colors.primary.main};
    padding-left: ${theme.spacing.md};
    margin: ${theme.spacing.lg} 0;
    font-style: italic;
    color: ${theme.colors.secondary.main};
  }

  hr {
    border: none;
    height: 1px;
    background-color: ${theme.colors.secondary.light};
    margin: ${theme.spacing.xl} 0;
  }
`;