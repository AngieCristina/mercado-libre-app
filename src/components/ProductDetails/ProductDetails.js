import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <h2>Detalles del producto</h2>
      {/* ... Otros detalles del producto ... */}
    </div>
  );
}

export default ProductDetails;
