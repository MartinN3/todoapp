import { QueryClient, queryOptions } from '@tanstack/react-query';
import { ActionFunctionArgs, generatePath, redirect } from 'react-router-dom';
import toInt from 'validator/es/lib/toInt';

import { ROUTES } from '../../../constants/routes';
import {
  getGetProductsProductIdQueryKey,
  getGetProductsQueryOptions,
  patchProductsProductId,
} from '../../../lib/api/product/product';
import { fakeAuthProvider } from '../../../utils/auth';

export default function action(queryClient: QueryClient) {
  return async ({ request, params: { id = '' } }: ActionFunctionArgs) => {
    const { user } = fakeAuthProvider;

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const response = await patchProductsProductId(toInt(id), updates);

    // orval generated api typescript hack
    const productEditQueryOrvalKey = getGetProductsProductIdQueryKey(toInt(id));

    // normaly i would want to invalidate query so it would refetch fresh data and be done
    // queryClient.invalidateQueries({
    //   queryKey: productEditQueryOrvalKey,
    // });

    // ********************************************************* //
    // Due to dummy API cache updates ⬇⬇
    // ********************************************************* //
    // but since we use dummy i manually update cache for product
    queryClient.setQueryData(
      [...productEditQueryOrvalKey, user?.username],
      response,
    );

    // and since we got products list, we have to update it too by hand
    // which would have to be abstracted to not be as ugly

    // orval generated api typescript hack
    const productsQueryOrvalOptions = getGetProductsQueryOptions();

    // orval generated api typescript hack
    const productsQuery = queryOptions({
      queryKey: [...productsQueryOrvalOptions.queryKey, user?.username],
      queryFn: productsQueryOrvalOptions.queryFn,
    });

    // get products list cache or fetch products if doesn't exist
    const productsQueryCache =
      queryClient.getQueryData(productsQuery.queryKey) ??
      (await queryClient.fetchQuery(productsQuery));

    // update products list cache with modified product
    queryClient.setQueryData(productsQuery.queryKey, {
      ...productsQueryCache,
      products: productsQueryCache.products?.map((product) => {
        if (product.id !== toInt(id)) {
          return product;
        }

        return response;
      }),
    });

    return redirect(generatePath(ROUTES.product, { id }));
  };
}
