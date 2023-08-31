import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Text,
  CardBody,
  Image,
  Heading,
  Button,
  Spinner,
} from '@chakra-ui/react';
function ProductDetails() {
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(
          `https://api.mercadolibre.com/items/${productId}/`
        );
        const data = await response.json();
        setProductDetails(data);
        console.log(setProductDetails, 'setProductDetails');
        console.log(productDetails, 'productDetails');
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <Card m={[2, 3]}>
        {productDetails ? (
          <CardBody>
            <Heading as="h4" size="md">
              Detalles de {productDetails.title}
            </Heading>
            <Image
              mt="8px"
              src={productDetails.thumbnail}
              alt={productDetails.image}
            />
            <Text m="2px">{productDetails.title}</Text>
            <Text m="2px" color="blue.600" fontSize="1xl">
              $ {productDetails.price}
            </Text>
            <Text m="2px">{productDetails.condition}</Text>
            <Text m="2px">
              Disponibles: {productDetails.available_quantity}
            </Text>
            <Text m="2px">{productDetails.warranty}</Text>
            <Button mt="6px" variant="solid" colorScheme="blue">
              COMPRAR
            </Button>
          </CardBody>
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Card>
    </>
  );
}

export default ProductDetails;
