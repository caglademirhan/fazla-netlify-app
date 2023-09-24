import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useECommerce } from './ECommerceContext';

function ProductDetails() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useECommerce();

  useEffect(() => {
    // Fetch the product details based on the 'id' parameter
    axios.get(`https://dummyjson.com/products/${id}`) // Update the URL as needed
      .then((response) => {
        setProduct(response.data); // Set the product details from the response
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]); // Trigger the fetch when the 'id' parameter changes

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const totalPrice = product.price * quantity; // Calculate the total price
    addToCart({ ...product, quantity, totalPrice }); // Add to cart with the selected quantity and total price
  };

  if (!product) {
    return null; // Return null if product is still loading
  }

  return (
    <div className="product-details" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      <p>{product.description}</p>
      <p className="price" style={{ fontWeight: 'bold', color: '#007bff' }}>
        ${product.price} x {quantity} = ${(product.price * quantity).toFixed(2)} {/* Display total price */}
      </p>
      <div className="quantity-controls">
        <button
          onClick={decreaseQuantity}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          -
        </button>
        <span style={{ fontSize: '1.2rem', margin: '0 10px' }}>{quantity}</span>
        <button
          onClick={increaseQuantity}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;










