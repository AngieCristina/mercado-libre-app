import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Text,
  CardBody,
  Image,
  Stack,
  HStack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
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
      setNoResults('No se encontraron resultados');
      setProducts([]);
    } else {
      setNoResults('');
      setProducts(filteredResults);
    }
    setIsLoading(false);
  }

  return (
    <Stack direction={['column', 'row']} spacing="24x" m={10}>
      {isLoading ? ( // Mostrar un mensaje de carga mientras isLoading sea true
        <p>Cargando...</p>
      ) : noResults ? (
        <p>{noResults}</p>
      ) : (
        <>
          {searchProduct &&
            products.map(product => (
              <Link to={`/product-list/${product.id}`}>
                <HStack
                  direction={['column', 'row']}
                  m={2}
                  align-items
                  baseline
                  spacing="24px"
                >
                  <Card maxW="sm">
                    <CardBody>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        borderRadius="lg"
                      />
                      <Heading size="m">{product.address.state_name}</Heading>
                      <Text>{product.condition}</Text>
                      <Text color="blue.600" fontSize="1xl">
                        $ {product.price}
                      </Text>
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
