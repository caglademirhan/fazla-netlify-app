import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { ThemeProvider } from './ThemeContext'; 

test('Header component renders correctly', () => {
  render(
    <Router>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </Router>
  );

  // Verify that the logo is presenting correctly
  const logoElement = screen.getByText('e-STORE');
  expect(logoElement).toBeInTheDocument();

  // Verify that navigation links are displaying correctly
  const homeLink = screen.getByText('Home');
  const favoritesLink = screen.getByText('Favorites');
  const cartLink = screen.getByText('Cart');

  expect(homeLink).toBeInTheDocument();
  expect(favoritesLink).toBeInTheDocument();
  expect(cartLink).toBeInTheDocument();
});

test('Header theme toggle works', () => {
  render(
    <Router>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </Router>
  );

  // Find and click the theme toggle button
  const themeToggle = screen.getByText('Dark Mode');
  fireEvent.click(themeToggle);

  // Verify that the theme has been toggled and switched
  const updatedThemeToggle = screen.getByText('Light Mode');
  expect(updatedThemeToggle).toBeInTheDocument();
});
