import React, { useEffect, useState } from 'react';

function ProductList({ searchProduct }) {
  const [products, setProducts] = useState([]);
  const [noResults, setNoResults] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getProducts();
    console.log(searchProduct,'productlist');
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
    <div>
      {isLoading ? ( // Mostrar un mensaje de carga mientras isLoading sea true
        <p>Cargando...</p>
      ) : noResults ? (
        <p>{noResults}</p>
      ) : (
        <>
          {!searchProduct && products.slice(0, 4).map((product) => (
            <div key={product.id}>
              <p>{product.address.state_name}</p>
              <p>{product.condition}</p>
              <p>{product.sold_quantity}</p>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <img src={product.thumbnail} alt={product.title} />
            </div>
          ))}
          {searchProduct && products.map((product) => (
            <div key={product.id}>
              <p>{product.address.state_name}</p>
              <p>{product.condition}</p>
              <p>{product.sold_quantity}</p>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <img src={product.thumbnail} alt={product.title} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ProductList;
