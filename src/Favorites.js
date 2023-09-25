import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useECommerce } from './ECommerceContext'; // Import the useECommerce hook
import { useTheme } from './ThemeContext'; // Import the useTheme hook

function Favorites() {
  const { state: { favorites }, removeFromFavorites } = useECommerce(); // Access the favorites array and removeFromFavorites function
  const { theme } = useTheme(); // Get the current theme from ThemeContext

  const containerStyle = {
    textAlign: 'center',
    padding: '40px',
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
    <div className="favorites" style={containerStyle}>
      <h1>Favorites</h1>
      <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {favorites.map((product) => (
          <div className="product-card" key={product.id} style={cardStyle}>
            {/* Heart Icon for removing from favorites */}
            <FaHeart
              style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', fontSize: '24px', cursor: 'pointer' }}
              onClick={() => removeFromFavorites(product)} // Remove from favorites on click
            />
            {/* Image */}
            <div style={{ height: '200px', overflow: 'hidden', marginBottom: '10px' }}>
              <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Product Info */}
            <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.2rem', margin: '10px 0' }}>{product.title}</h2>
              <p style={{ fontSize: '1rem', flex: 1 }}>{product.description}</p>
              <p className="price" style={{ fontWeight: 'bold', color: theme === 'dark' ? 'grey' : '#007bff', margin: '10px 0' }}>
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

