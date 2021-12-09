import Main from './Main';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AuthProvider from './contexts/auth';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F2BC79', //light brown
    },
    secondary: {
      main: '#8C4830', //dark brown
    },
    error: {
      main: '#D99962', //middle brown
    },
    warning: {
      main: '#242526', //black
    },
    info: {
      main: '#F6FBFE', //light blue
    },
  },
  typography: {
    h1: {
      fontFamily: '"Cinzel", serif',
      fontSize: 67,
      color: '#8C4830',
    },
    h2: {
      fontFamily: '"Cinzel", serif',
      fontSize: 36,
      color: '#8C4830',
    },
    h3: {
      fontFamily: '"Cinzel", serif',
      fontSize: 28,
      color: '#8C4830',
    },
    h4: {
      fontFamily: '"Kiwi Maru", serif',
      fontSize: 28,
      color: '#D99962',
    },
    h5: {
      fontFamily: '"Kiwi Maru", serif',
      fontSize: 18,
      color: '#F6FBFE',
    },
    h6: {
      fontFamily: '"Kiwi Maru", serif',
      fontSize: 18,
      color: '#8C4830',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    subtitle1: {
      fontFamily: '"Kiwi Maru", serif',
      fontSize: 16,
      color: '#8C4830',
    },
    subtitle2: {
      fontFamily: '"Kiwi Maru", serif',
      fontSize: 26,
      color: '#242526',
    },
    button: {
      fontFamily: '"Kiwi Maru", serif',
      fontSize: 20,
      color: '#242526',
      textTransform: 'none',
    }
  }
})

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
