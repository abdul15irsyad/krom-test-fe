import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Provider = ({ children }: { children: React.JSX.Element }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
