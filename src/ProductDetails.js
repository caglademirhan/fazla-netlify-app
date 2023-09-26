import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useECommerce } from './ECommerceContext';
import { useTheme } from './ThemeContext'; 

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToFavorites, removeFromFavorites, state } = useECommerce(); 
  const { theme } = useTheme(); 

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
    addToCart({ ...product, quantity }); 
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

  const containerStyle = {
    width: '70%', 
    margin: '0 auto', 
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative', 
    backgroundColor: theme === 'dark' ? '#3D426B' : '#F8B88B', 
    color: theme === 'dark' ? 'grey' : 'black', 
  };
  const mainContainerStyle = {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: theme === 'dark' ? 'gray' : 'white', 
  };

  const buttonStyle = {
    backgroundColor: theme === 'dark' ? '#ccc' : '#007bff',
    color: theme === 'dark' ? 'black' : 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
  };

  return (
    <div className="home" style={mainContainerStyle}>
    <div className="product-details" style={containerStyle}>
      
      <FaHeart
        onClick={handleToggleFavorite}
        style={{
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          color: isFavorite ? 'red' : 'gray',
          cursor: 'pointer',
          fontSize: '24px', 
        }}
      />
      <span style={{ fontSize: '18px', position: 'absolute', top: '10px', right: '40px' }}>
        Add to Favorites
      </span>
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      <p>{product.description}</p>
      <div className="quantity-controls" style={{ marginTop: '20px' }}>
        
        <button onClick={decreaseQuantity} style={buttonStyle}>
          -
        </button>
        <span style={{ fontSize: '1.2rem', margin: '0 10px' }}>{quantity}</span>
        <button onClick={increaseQuantity} style={buttonStyle}>
          +
        </button>
      </div>
      <p className="price" style={{ fontWeight: 'bold', color: theme === 'dark' ? 'grey' : '#007bff' }}>
        ${product.price * quantity} 
      </p>
      <button onClick={handleAddToCart} style={buttonStyle}>
        Add to Cart
      </button>
    </div>
    </div>
  );
}

export default ProductDetails;















