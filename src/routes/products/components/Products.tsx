import { useRouteLoaderData } from 'react-router-dom';

import {
  getGetProductsQueryOptions,
  useGetProducts,
} from '../../../lib/api/product/product';
import { User } from '../../../model';
import SingleProduct from './SingleProduct';

export default function Products() {
  const { user } = useRouteLoaderData('root') as { user: User | null };
  const { data } = useGetProducts(undefined, {
    query: {
      queryKey: [...getGetProductsQueryOptions().queryKey, user?.username],
    },
  });

  return data?.products?.map((product) => {
    return <SingleProduct product={product} key={product.id} />;
  });
}
