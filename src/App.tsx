import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Provider } from './components/provider/provider';
import { router } from './router';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 800,
          },
        },
      },
    },
    typography: {
      fontFamily: [
        '"Plus Jakarta Sans"',
        '"Inter"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
