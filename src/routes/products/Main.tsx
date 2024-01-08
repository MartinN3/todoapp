import { Container, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import Products from './components/Products';
import loader from './route/routeLoader';

export default function ProductsRoute() {
  // @ts-expect-error TODO fix this ankwardness with https://gist.github.com/dadamssg/66205f7884df74acfabb15a672419ce6#file-useloaderdata-indirection-tsx
  const { products } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return (
    <>
      <Container maxW="5xl">
        <SimpleGrid spacing={4} columns={{ sm: 2, md: 3 }}>
          <Suspense
            fallback={[...Array(12)].map((_, index) => (
              <Skeleton h={577} borderRadius={5} key={index} />
            ))}
          >
            <Await
              resolve={products}
              errorElement={<p>Error loading products!</p>}
            >
              <Products />
            </Await>
          </Suspense>
        </SimpleGrid>
      </Container>
    </>
  );
}
