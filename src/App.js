import React, { Children, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Link as LinkFromChakra,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import ProductList from './components/ProductList/ProductList';
import SearchProducts from './components/SearchProducts/SearchProducts';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  const [searchProduct, setSearchProduct] = useState('');

  const handleSearch = product => {
    setSearchProduct(product);
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <SearchProducts onSearch={handleSearch} />
          <Link to="/product-list" />
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/product-list',
          element: <ProductList searchProduct={searchProduct} />,
        },
        {
          path: '/product-list/:productId',
          element: <ProductDetails/>,
        },
      ],
    },
  ]);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
