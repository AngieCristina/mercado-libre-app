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
    console.log(searchProduct);
  };

  return (
    <Link type="submit" to="/product-list">
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={searchProduct} onChange={handleChange} />
          Buscar
        </form>
      </div>
    </Link>
  );
}

export default SearchProducts;
