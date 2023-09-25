import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useECommerce } from './ECommerceContext';
import { useTheme } from './ThemeContext'; // Import useTheme from your ThemeContext

function Home() {
  const { addToFavorites, removeFromFavorites, addToCart, removeFromCart } = useECommerce();
  const { favorites, cart } = useECommerce().state;
  const [products, setProducts] = useState([]);

  const { theme } = useTheme(); // Get the current theme from ThemeContext

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Define your styles based on the current theme
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: theme === 'dark' ? 'gray' : 'white', // Change the base background color
  };

  const cardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    width: '250px',
    backgroundColor: theme === 'dark' ? '#3D426B' : '#F8B88B', // Change the card background color
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    color: theme === 'dark' ? 'grey' : 'black', // Text color
  };

  return (
    <div className="home" style={containerStyle}>
      <h1>Products</h1>
      <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            style={cardStyle} // Apply the cardStyle based on the theme
          >
            <FaHeart
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: favorites.some((item) => item.id === product.id) ? 'red' : 'gray',
                fontSize: '24px',
                cursor: 'pointer',
              }}
              onClick={() =>
                favorites.some((item) => item.id === product.id)
                  ? removeFromFavorites(product)
                  : addToFavorites(product)
              }
            />
            <div style={{ height: '200px', overflow: 'hidden', marginBottom: '10px' }}>
              <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.2rem', margin: '10px 0' }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.title}
                </Link>
              </h2>
              <p style={{ fontSize: '1rem', flex: 1 }}>{product.description}</p>
              <p className="price" style={{ fontWeight: 'bold', color: theme === 'dark' ? 'grey' : '#007bff', margin: '10px 0' }}>
                ${product.price}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => (cart.some((item) => item.id === product.id) ? removeFromCart(product) : addToCart(product))}
                  style={{
                    backgroundColor: cart.some((item) => item.id === product.id) ? 'red' : 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {cart.some((item) => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <FaShoppingCart
                  style={{
                    color: cart.some((item) => item.id === product.id) ? 'red' : 'gray',
                    fontSize: '24px',
                    cursor: 'pointer',
                  }}
                  onClick={() => (cart.some((item) => item.id === product.id) ? removeFromCart(product) : addToCart(product))}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;






