import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

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
      fontFamily: ['"Plus Jakarta Sans"', 'Roboto'].join(','),
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        style={{ fontFamily: ['"Plus Jakarta Sans"', 'Roboto'].join(',') }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
