import { Button, Input, Textarea } from '@chakra-ui/react';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';

import loader from './routerLoader';

export default function ProductEdit() {
  const product = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const navigate = useNavigate();

  return (
    <Form method="post">
      <Input name="title" defaultValue={product.data.title} />
      <Textarea name="description" defaultValue={product.data.description} />
      <Button type="submit">Save</Button>
      <Button onClick={() => navigate(-1)}>Save</Button>
    </Form>
  );
}
