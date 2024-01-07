import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
} from '@chakra-ui/react';
import { Link as RouterLink, useRouteError } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <Container my={10}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Unexpected error!</AlertTitle>
        <AlertDescription>
          There was an unexpected error in application.
        </AlertDescription>
      </Alert>
      <Button as={RouterLink} to={ROUTES.root} mt={5} colorScheme="teal">
        Back to homepage
      </Button>
    </Container>
  );
}
