import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    hhr: Palette['primary'];
  }

  interface PaletteOptions {
    hhr?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option

const hhrColors = createTheme({
  palette: {
    hhr: {
      main: '#42603C',
      light: '#F0F5EF',
      dark: '#6A6C6A',
      contrastText: '#E2E7E2',
    },
  },
});

export default hhrColors;
