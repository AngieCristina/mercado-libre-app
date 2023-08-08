import React, { useState } from 'react';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchProduct} onChange={handleChange} />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default SearchProducts;
