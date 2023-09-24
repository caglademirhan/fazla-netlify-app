import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useECommerce } from './ECommerceContext';

function Home() {
    const [products, setProducts] = useState([]);
    const { state: { favorites }, addToFavorites, removeFromFavorites } = useECommerce();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to toggle favoriting a product
  const toggleFavorite = (product) => {
    if (favorites.some((item) => item.id === product.id)) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="home" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Products</h1>
      <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {products.map((product) => (
          <div className="product-card" key={product.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px',
            width: '250px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
            {/* Heart Icon */}
            <FaHeart
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'red', // Set the initial color to red
                fontSize: '24px',
                cursor: 'pointer',
              }}
              onClick={() => toggleFavorite(product)} // Call the toggleFavorite function
            />
            {/* Image */}
            <div style={{ height: '200px', overflow: 'hidden', marginBottom: '10px' }}>
              <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Product Info */}
            <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.2rem', margin: '10px 0' }}>{product.title}</h2>
              <p style={{ fontSize: '1rem', flex: 1 }}>{product.description}</p>
              <p className="price" style={{ fontWeight: 'bold', color: '#007bff', margin: '10px 0' }}>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
