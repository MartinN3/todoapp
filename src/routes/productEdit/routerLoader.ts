import { getGetProductsProductIdQueryOptions } from '../../lib/api/product/product';

export default function loader(queryClient) {
  return async ({ params }) => {
    const query = getGetProductsProductIdQueryOptions(params.id);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
}
