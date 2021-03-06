import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue, green, grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    serviceColor: {
      red: red[100],
      blue: blue[100],
      green: green[100],
      darkGrey: grey[600],
      lightGrey: grey[300],
    },
  },
});

export default theme;
