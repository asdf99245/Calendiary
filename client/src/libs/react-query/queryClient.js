import { QueryClient } from 'react-query';

const errorHandler = (error) => {
  const message =
    error instanceof Error ? error.message : 'error connecting to server';

  alert(message);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onError: errorHandler,
    },
    mutations: {
      onError: errorHandler,
    },
  },
});

export default queryClient;
