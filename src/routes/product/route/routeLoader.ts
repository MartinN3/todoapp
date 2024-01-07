import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import toInt from 'validator/es/lib/toInt';

import { getGetProductsProductIdQueryOptions } from '../../../lib/api/product/product';
import { fakeAuthProvider } from '../../../utils/auth';

export default function loader(queryClient: QueryClient) {
  return async ({ params: { id = '' } }: LoaderFunctionArgs) => {
    const { user } = fakeAuthProvider;
    const queryOrvalOptions = getGetProductsProductIdQueryOptions(toInt(id));
    const query = queryOptions({
      queryKey: [...queryOrvalOptions.queryKey, user?.username],
      queryFn: queryOrvalOptions.queryFn,
    });

    return (
      // get from cache or fetch from server if doesnt exist
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
}
