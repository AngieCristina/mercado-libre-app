import { Box, InputGroup, Input, Image, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchProducts({ onSearch }) {
  const [searchProduct, setSearchProduct] = useState('');

  const handleChange = event => {
    setSearchProduct(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSearch(searchProduct);
  };

  return (
    <Link type="submit" to="/product-list">
      <Stack m={4} direction="row">
        <Box >
          <Image
            src="/mercado.png"
            alt="icon-mercado-libre"
            boxSize="100px"
          ></Image>
        </Box>
        <Box w="100%" p={4} color="black">
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                placeholder="Buscar un producto"
                type="text"
                value={searchProduct}
                onChange={handleChange}
              />
            </InputGroup>
          </form>
        </Box>
      </Stack>
    </Link>
  );
}

export default SearchProducts;
