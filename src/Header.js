import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHeart, FaShoppingCart, FaStore } from 'react-icons/fa'; // Import icons from react-icons library
import { FiSun, FiMoon } from 'react-icons/fi'; // Import icons for light/dark mode

function Header() {
  // State for managing the theme mode (light/dark)
  const [isDarkMode, setDarkMode] = useState(false);

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
   
  };

  // Get the current route location
  const location = useLocation();

  return (
    <header style={headerStyle}>
      <div style={leftContainerStyle}>
        {/* Wrap the logo with a Link component */}
        <Link to="/" style={logoLinkStyle}>
          <FaStore size={32} /> {/*  */}
          <span style={logoTextStyle}> FAZLA-STORE </span>
        </Link>
      </div>
      <div style={rightContainerStyle}>
        <nav style={navStyle}>
          {/* Add other navigation links as needed */}
          <Link to="/favorites" style={{ ...linkStyle, ...(location.pathname === '/favorites' && activeTabStyle) }}>
            Favorites <FaHeart />
          </Link>
          <Link to="/cart" style={{ ...linkStyle, ...(location.pathname === '/cart' && activeTabStyle) }}>
            Cart <FaShoppingCart />
          </Link>
          <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' && activeTabStyle) }}>
            Home <FaHome />
          </Link>
        </nav>
        <button onClick={toggleTheme} style={themeButtonStyle}>
          {isDarkMode ? <FiSun /> : <FiMoon />} {/* Toggle between sun and moon icons */}
          {isDarkMode ? ' Light Mode' : ' Dark Mode'}
        </button>
      </div>
    </header>
  );
}

// CSS Styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#333',
  padding: '10px 20px',
  color: 'white',
};

const leftContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

// Add logoLinkStyle for the logo link
const logoLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  fontSize: '32px',
};

const logoTextStyle = {
  marginLeft: '10px', 
  fontWeight: 'bold', 
  color: 'orange',
};

const rightContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const navStyle = {
  display: 'flex',
  gap: '20px',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
};

const themeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
};

// Style for the active tab
const activeTabStyle = {
  color: 'orange', // Change the color as desired
  fontWeight: 'bold', // Add other styling for active tab
};

export default Header;





