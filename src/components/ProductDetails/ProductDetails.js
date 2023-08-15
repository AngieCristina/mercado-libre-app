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
    <>
    <div>
      <h2>Detalles del producto</h2>
    {productDetails ? (
      <div>
      <img src={productDetails.thumbnail} alt={productDetails.image} />
      <h2>{productDetails.condition}</h2>
      <h2>{productDetails.title}</h2>
      <h2>{productDetails.original_price}</h2>
      </div>
    ) : (
      <p>Loading...</p>
    )}
    </div>
    </>
  );
}

export default ProductDetails;
