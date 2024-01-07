import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  Link,
  generatePath,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
import toInt from 'validator/es/lib/toInt';

import { ROUTES } from '../../constants/routes';
import {
  getGetProductsProductIdQueryOptions,
  useGetProductsProductId,
} from '../../lib/api/product/product';
import { User } from '../../model';
import loader from './route/routeLoader';

export default function ProductRoute() {
  const { user } = useRouteLoaderData('root') as { user: User | null };
  // first we get data fetched by react router
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const { id = '' } = useParams();
  const { data, status, error } = useGetProductsProductId(
    // types explicitly say to send number ID param API but usually we can send both
    toInt(id),
    undefined,
    {
      query: {
        initialData,
        queryKey: [
          ...getGetProductsProductIdQueryOptions(toInt(id)).queryKey,
          user?.username,
        ],
      },
    },
  );

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  if (status === 'pending') {
    if (toInt(id) !== toInt(id)) {
      return (
        <span>
          Product doesn't exist because only numbered products are possible
        </span>
      );
    }

    return <span>Loading...</span>;
  }

  return (
    <>
      <Box height={280}>
        <Image
          src={data.images?.find(Boolean)}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          maxH={280}
        />
      </Box>
      <Stack mt="6" mb="2" spacing="3">
        <Heading size="md">{data.title}</Heading>
        <Text noOfLines={3}>{data.description}</Text>
        <Text color="blue.600" fontSize="2xl">
          {data.price} $
        </Text>
      </Stack>
      <Divider />
      <ButtonGroup spacing="2" mt={4}>
        <Button
          variant="solid"
          colorScheme="blue"
          as={Link}
          to={generatePath(ROUTES.productEdit, { id: data.id })}
        >
          Edit
        </Button>
      </ButtonGroup>
    </>
  );
}
