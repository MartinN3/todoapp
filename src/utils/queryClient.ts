import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // since we use dummy, we don't want refetch ever for updates to stay in cache
      staleTime: Infinity,
    },
  },
});
