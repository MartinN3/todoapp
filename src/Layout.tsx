import { HStack, Link, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import useAuth from './hooks/useAuth';

export default function Layout(props: PropsWithChildren) {
  const token = useAuth();
  console.log(token);
  return (
    <>
      <HStack mb={5}>
        <Link as={NavLink} to={ROUTES.root}>
          <Text>Homepage</Text>
        </Link>
        <Link as={NavLink} to={ROUTES.todos}>
          <Text>Todos</Text>
        </Link>
        <Link as={NavLink} to={ROUTES.products}>
          <Text>Products</Text>
        </Link>
        <Link as={NavLink} to={ROUTES.login}>
          <Text>Login</Text>
        </Link>
      </HStack>
      {props.children}
    </>
  );
}
