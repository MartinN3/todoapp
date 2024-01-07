import { Container, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';

import {
  getGetProductsQueryOptions,
  useGetProducts,
} from '../../lib/api/product/product';
import { User } from '../../model';
import SingleProduct from './components/SingleProduct';

export default function ProductsRoute() {
  const { user } = useRouteLoaderData('root') as { user: User | null };
  const { data, status, error } = useGetProducts(undefined, {
    query: {
      queryKey: [...getGetProductsQueryOptions().queryKey, user?.username],
    },
  });

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Container maxW="5xl">
        <SimpleGrid spacing={4} columns={{ sm: 2, md: 3 }}>
          {data?.products?.map((product) => {
            return <SingleProduct product={product} key={product.id} />;
          })}
          {status === 'pending' &&
            [...Array(12)].map(() => <Skeleton h={577} borderRadius={5} />)}
        </SimpleGrid>
      </Container>
    </>
  );
}
