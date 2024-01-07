import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { getGetProductsQueryOptions } from '../../../lib/api/product/product';
import { fakeAuthProvider } from '../../../utils/auth';

export default function loader(queryClient: QueryClient) {
  return async ({ request }: LoaderFunctionArgs) => {
    const { user, isAuthenticated } = fakeAuthProvider;
    if (!isAuthenticated) {
      const params = new URLSearchParams();
      params.set('from', new URL(request.url).pathname);
      return redirect('/login?' + params.toString());
    }

    // I think orval doesn't provide queryOptions for this purpose yet
    const queryOrvalOptions = getGetProductsQueryOptions();

    // We just do it with orval method but by hand
    const query = queryOptions({
      queryKey: [...queryOrvalOptions.queryKey, user?.username],
      queryFn: queryOrvalOptions.queryFn,
    });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
}
