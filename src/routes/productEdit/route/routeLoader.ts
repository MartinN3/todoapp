import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import toInt from 'validator/es/lib/toInt';

import { getGetProductsProductIdQueryOptions } from '../../../lib/api/product/product';
import { fakeAuthProvider } from '../../../utils/auth';

export default function loader(queryClient: QueryClient) {
  return async ({ params: { id = '' } }: LoaderFunctionArgs) => {
    const { user } = fakeAuthProvider;
    // I think orval doesn't provide queryOptions for this purpose yet
    const queryOrvalOptions = getGetProductsProductIdQueryOptions(toInt(id));

    // We just do it with orval method but by hand
    const query = queryOptions({
      queryKey: [...queryOrvalOptions.queryKey, user?.username],
      queryFn: queryOrvalOptions.queryFn,
    });
    return queryClient.ensureQueryData(query);
  };
}
