import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
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
      {from && (
        <Alert status="warning" my={4}>
          <AlertIcon />
          <AlertTitle>You are not logged in!</AlertTitle>
          <AlertDescription>
            You must log in to view the page at {from}
          </AlertDescription>
        </Alert>
      )}

      <FormControl my={4}>
        <FormLabel>User select</FormLabel>
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
        <FormHelperText>
          Just select user from predefined to log in.
        </FormHelperText>
      </FormControl>

      <Form method="post" replace>
        <Input type="hidden" name="redirectTo" value={from ?? ROUTES.root} />
        <Stack gap={2}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={selectedLogin?.username ?? ''}
              name="username"
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              value={selectedLogin?.password ?? ''}
              name="password"
              readOnly
            />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          disabled={isLoggingIn}
          my={4}
          width="100%"
          colorScheme="green"
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      {actionData && actionData.error ? (
        <Text color="tomato">{actionData.error}</Text>
      ) : null}
    </Container>
  );
}
