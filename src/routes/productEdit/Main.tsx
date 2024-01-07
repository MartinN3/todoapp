import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import {
  Form,
  Link as RouterLink,
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

export default function ProductEditRoute() {
  const { user } = useRouteLoaderData('root') as { user: User | null };
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const params = useParams();
  const { data: product } = useGetProductsProductId(
    toInt(params.id ?? ''),
    undefined,
    {
      query: {
        initialData,
        queryKey: [
          ...getGetProductsProductIdQueryOptions(toInt(params.id ?? ''))
            .queryKey,
          user?.username,
        ],
      },
    },
  );

  return (
    <Form method="post">
      <Stack mt={10} mb={4} gap={4}>
        <Input name="title" defaultValue={product?.title} />
        <Textarea name="description" defaultValue={product?.description} />
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input name="price" type="number" defaultValue={product?.price} />
        </InputGroup>
      </Stack>
      <Stack gap={4} direction={'row'}>
        <Button type="submit" colorScheme="teal">
          Save
        </Button>
        <Button
          as={RouterLink}
          to={generatePath(ROUTES.product, { id: product?.id })}
        >
          Cancel
        </Button>
      </Stack>
    </Form>
  );
}
