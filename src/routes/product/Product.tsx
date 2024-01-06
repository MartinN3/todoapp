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
import { Link, generatePath, useParams } from 'react-router-dom';
import toInt from 'validator/es/lib/toInt';

import { ROUTES } from '../../constants/routes';
import { useGetProductsProductId } from '../../lib/api/product/product';

export default function Product() {
  const { id = '' } = useParams();

  const { data, status, error } = useGetProductsProductId(
    toInt(id),
    undefined,
    {
      query: {
        // https://stackoverflow.com/questions/60964575/in-the-book-you-dont-know-js-i-have-a-question-about-isnan-polyfills
        enabled: toInt(id) === toInt(id),
      },
    },
  );

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Box height={280}>
        <Image
          src={data?.data.images?.find(Boolean)}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          maxH={280}
        />
      </Box>
      <Stack mt="6" mb="2" spacing="3">
        <Heading size="md">{data?.data.title}</Heading>
        <Text noOfLines={3}>{data?.data.description}</Text>
        <Text color="blue.600" fontSize="2xl">
          {data?.data.price} $
        </Text>
      </Stack>
      <Divider />
      <ButtonGroup spacing="2" mt={4}>
        <Button
          variant="solid"
          colorScheme="blue"
          as={Link}
          to={generatePath(ROUTES.productEdit, { id: data?.data.id })}
        >
          Edit
        </Button>
      </ButtonGroup>
    </>
  );
}
