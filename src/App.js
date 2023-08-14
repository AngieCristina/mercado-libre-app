import React, { Children, useState } from 'react';
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  Link,
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

function App() {
  const [searchProduct, setSearchProduct] = useState('');

  const handleSearch = product => {
    setSearchProduct(product);
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SearchProducts onSearch={handleSearch} />,
      children: [
        {
          path: '/',
          element: <div>main route</div>,
        },
        {
          path: '/product-list',
          element: <ProductList />,
        },
      ],
    },
  ]);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      {/* <Router>
        <Routes>
          <Route
            path="/"
            element={<SearchProducts onSearch={handleSearch} />}
          />
          <Route
            path="/product-list"
            element={<ProductList searchProduct={searchProduct} />}
          />
        </Routes>
      </Router> */}
    </ChakraProvider>
  );
}

export default App;
