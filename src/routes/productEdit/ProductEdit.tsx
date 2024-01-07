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
} from 'react-router-dom';
import toInt from 'validator/es/lib/toInt';

import { ROUTES } from '../../constants/routes';
import { useGetProductsProductId } from '../../lib/api/product/product';
import loader from './routerLoader';

export default function ProductEdit() {
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
      },
    },
  );

  return (
    <Form method="post">
      <Stack mt={10} mb={4} gap={4}>
        <Input name="title" defaultValue={product?.data.title} />
        <Textarea name="description" defaultValue={product?.data.description} />
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            name="price"
            type="number"
            defaultValue={product?.data.price}
          />
        </InputGroup>
      </Stack>
      <Stack gap={4} direction={'row'}>
        <Button type="submit" colorScheme="teal">
          Save
        </Button>
        <Button
          as={RouterLink}
          to={generatePath(ROUTES.product, { id: product?.data.id })}
        >
          Cancel
        </Button>
      </Stack>
    </Form>
  );
}
