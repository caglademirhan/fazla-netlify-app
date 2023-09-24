import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import 'Routes'

import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import Cart from './Cart';
import ProductDetails from './ProductDetails';
import { ECommerceProvider } from './ECommerceContext';

function App() {
  return (
    <Router>
      <ECommerceProvider>
        <Header />
        <Routes> {/* Use 'Routes' to wrap your routes */}
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </ECommerceProvider>
    </Router>
  );
}

export default App;
