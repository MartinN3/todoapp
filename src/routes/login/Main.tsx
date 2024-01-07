import { Button, Container, Input, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  Form,
  useActionData,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { PostAuthLoginBody, User } from '../../model';

const users = [
  {
    username: 'atuny0',
    password: '9uQFF1Lh',
  },
  {
    username: 'hbingley1',
    password: 'CQutx25i8r',
  },
  {
    username: 'rshawe2',
    password: 'OWsTbMUgFc',
  },
] satisfies PostAuthLoginBody[];

export default function LoginRoute() {
  const { user } = useRouteLoaderData('root') as { user: User | null };
  const [params] = useSearchParams();
  const [selectedLogin, setSelectedLogin] = useState<PostAuthLoginBody | null>(
    user,
  );

  const from = params.get('from');

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <Container>
      {from && <Text>You must log in to view the page at {from}</Text>}

      <Select
        placeholder="Select user"
        value={selectedLogin?.username}
        onChange={(e) => {
          setSelectedLogin(
            users.find((user) => user.username === e.target.value) ?? null,
          );
        }}
      >
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </Select>

      <Form method="post" replace>
        <Input type="hidden" name="redirectTo" value={from ?? ROUTES.root} />
        <Input value={selectedLogin?.username ?? ''} name="username" readOnly />
        <Input value={selectedLogin?.password ?? ''} name="password" readOnly />
        <Button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      {actionData && actionData.error ? (
        <Text colorScheme="red">{actionData.error}</Text>
      ) : null}
    </Container>
  );
}
