import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHeart, FaShoppingCart, FaStore } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeContext'; // Import useTheme

function Header() {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggleTheme from ThemeContext
  const location = useLocation();

  return (
    <header
      style={{
        ...headerStyle,
        backgroundColor: theme === 'dark' ? 'gray' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      }}
    >
      <div style={leftContainerStyle}>
        <Link to="/" style={logoLinkStyle}>
          <FaStore size={32} />
          <span
            style={{
              ...logoTextStyle,
              color: theme === 'dark' ? '#F8B88B' : '#000',
            }}
          >
            e-STORE
          </span>
        </Link>
      </div>
      <div style={rightContainerStyle}>
        <nav style={navStyle}>
          <Link
            to="/favorites"
            style={{
              ...linkStyle,
              ...(location.pathname === '/favorites' && activeTabStyle),
            }}
          >
            Favorites <FaHeart />
          </Link>
          <Link
            to="/cart"
            style={{
              ...linkStyle,
              ...(location.pathname === '/cart' && activeTabStyle),
            }}
          >
            Cart <FaShoppingCart />
          </Link>
          <Link
            to="/"
            style={{
              ...linkStyle,
              ...(location.pathname === '/' && activeTabStyle),
            }}
          >
            Home <FaHome />
          </Link>
        </nav>
        <button onClick={toggleTheme} style={themeButtonStyle}>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
          {theme === 'dark' ? ' Light Mode' : ' Dark Mode'}
        </button>
      </div>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
};

const leftContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoLinkStyle = {
  textDecoration: 'none',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
};

const logoTextStyle = {
  marginLeft: '10px',
  fontWeight: 'bold',
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
  color: '#000',
  display: 'flex',
  alignItems: 'center',
};

const themeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#000',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
};

const activeTabStyle = {
  color: '#F8B88B',
  fontWeight: 'bold',
};

export default Header;







