import { Container, SimpleGrid, Skeleton } from '@chakra-ui/react';

import { useGetProducts } from '../../lib/api/product/product';
import SingleProduct from './components/SingleProduct';

export default function ProductsRoute() {
  const { data, status, error } = useGetProducts();

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Container maxW="5xl">
        <SimpleGrid spacing={4} columns={{ sm: 2, md: 3 }}>
          {data?.data.products?.map((product) => {
            return <SingleProduct product={product} />;
          })}
          {status === 'pending' &&
            [...Array(12)].map(() => <Skeleton h={577} borderRadius={5} />)}
        </SimpleGrid>
      </Container>
    </>
  );
}
