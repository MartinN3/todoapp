import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink, generatePath } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { Product } from '../../../model';

type ProductProps = {
  product: Product;
};
export default function SingleProduct(props: ProductProps) {
  return (
    <Card maxW="sm" key={props.product.id}>
      <CardBody display="flex" flexFlow="column">
        <Box height={280}>
          <Image
            src={props.product.images?.find(Boolean)}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            maxH={280}
          />
        </Box>
        <Stack mt="6" mb="2" spacing="3">
          <Heading size="md">{props.product.title}</Heading>
          <Text noOfLines={3}>{props.product.description}</Text>
        </Stack>
        <Text color="blue.600" fontSize="2xl" mt="auto">
          {props.product.price} $
        </Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            as={RouterLink}
            to={generatePath(ROUTES.product, { id: props.product.id })}
          >
            View detail
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
