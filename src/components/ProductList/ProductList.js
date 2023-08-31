import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Text,
  CardBody,
  Image,
  Stack,
  HStack,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Spinner,
  Flex,
} from '@chakra-ui/react';
function ProductList({ searchProduct }) {
  const [products, setProducts] = useState([]);
  const [noResults, setNoResults] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getProducts();
  }, [searchProduct]);
  async function getProducts() {
    setIsLoading(true);
    const urlProducts = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(
      searchProduct
    )}`;
    const response = await fetch(urlProducts);
    const data = await response.json();
    const allResults = data.results;

    let filteredResults = allResults;
    if (searchProduct) {
      filteredResults = allResults.filter(product =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }
    if (filteredResults.length === 0) {
      setNoResults('');
      setProducts([]);
    } else {
      setNoResults('');
      setProducts(filteredResults);
    }
    setIsLoading(false);
  }

  return (
    <Stack
      direction={['column', 'row']}
      spacing="24x"
      m={10}
      alignItems="flex-end"
    >
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : noResults ? (
        <p>{noResults}</p>
      ) : (
        <>
          {searchProduct &&
            products.map(product => (
              <Link key={product.id} to={`/product-list/${product.id}`}>
                <HStack direction={['column', 'row']} m={2} spacing="24px">
                  <Card maxW="sm">
                    <CardBody>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        borderRadius="lg"
                      />
                      <Text>{product.title}</Text>
                      <Text>{product.condition}</Text>
                      <Text color="blue.600" fontSize="1xl">
                        $ {product.price}
                      </Text>
                      <Text>{product.address.state_name}</Text>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button variant="solid" colorScheme="blue">
                          VER
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </HStack>
              </Link>
            ))}
        </>
      )}
    </Stack>
  );
}

export default ProductList;
