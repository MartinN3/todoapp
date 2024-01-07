import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { Link, generatePath } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useGetProducts } from '../../lib/api/product/product';

export default function Products() {
  const { data, status, error } = useGetProducts();

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Container maxW="5xl">
        <SimpleGrid spacing={4} columns={{ sm: 2, md: 3 }}>
          {data?.data.products?.map((product) => {
            return (
              <Card maxW="sm" key={product.id}>
                <CardBody display="flex" flexFlow="column">
                  <Box height={280}>
                    <Image
                      src={product.images?.find(Boolean)}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                      maxH={280}
                    />
                  </Box>
                  <Stack mt="6" mb="2" spacing="3">
                    <Heading size="md">{product.title}</Heading>
                    <Text noOfLines={3}>{product.description}</Text>
                  </Stack>
                  <Text color="blue.600" fontSize="2xl" mt="auto">
                    {product.price} $
                  </Text>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      as={Link}
                      to={generatePath(ROUTES.product, { id: product.id })}
                    >
                      View detail
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
          {status === 'pending' && (
            <>
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
              <Skeleton h={577} borderRadius={5} />
            </>
          )}
        </SimpleGrid>
      </Container>
    </>
  );
}
