import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import Cart from './Cart';
import ProductDetails from './ProductDetails';
import { ECommerceProvider } from './ECommerceContext';
import { ThemeProvider } from './ThemeContext'; // Import the ThemeProvider

function App() {
  return (
    <Router>
      <ThemeProvider> {/* Wrap your entire app with the ThemeProvider */}
        <ECommerceProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </ECommerceProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

