import { generatePath, redirect } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { patchProductsProductId } from '../../lib/api/product/product';
import { queryClient as queryClients } from '../../utils/queryClient';

export default function action(queryClient: typeof queryClients) {
  return async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await patchProductsProductId(params.id, updates);
    queryClient.invalidateQueries({
      queryKey: ['products', { id: params.id }],
    });
    return redirect(generatePath(ROUTES.product, { id: params.id }));
  };
}
