import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useECommerce } from './ECommerceContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToFavorites, removeFromFavorites, state } = useECommerce(); // Add this line

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Use the selected quantity
  };

  const handleToggleFavorite = () => {
    const isFavorite = state.favorites.some((item) => item.id === product.id);

    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  if (!product) {
    return null;
  }

  const isFavorite = state.favorites.some((item) => item.id === product.id);

  return (
    <div
      className="product-details"
      style={{
        width: '70%', // Set a fixed width
        margin: '0 auto', // Center the div horizontally
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        position: 'relative', // Add position relative to the div
      }}
    >
      {/* Move the heart button */}
      <FaHeart
        onClick={handleToggleFavorite}
        style={{
          position: 'absolute', // Position the heart button absolutely
          top: '10px', // Adjust top position as needed
          right: '10px', // Adjust right position as needed
          color: isFavorite ? 'red' : 'gray',
          cursor: 'pointer',
          fontSize: '24px', // Increase the font size
        }}
      />
      <span style={{ fontSize: '18px', position: 'absolute', top: '10px', right: '40px' }}>
        Add to Favorites
      </span>
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      <p>{product.description}</p>
      <div className="quantity-controls" style={{ marginTop: '20px' }}>
        {/* Add increase and decrease buttons here */}
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
      <p className="price" style={{ fontWeight: 'bold', color: '#007bff' }}>
        ${product.price * quantity} {/* Update the price */}
      </p>
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














