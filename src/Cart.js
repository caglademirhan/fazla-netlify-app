import React from 'react';
import { useECommerce } from './ECommerceContext';
import { useModal } from './cartActions';
import { useTheme } from './ThemeContext';

function Cart() {
  const { state, removeFromCart, addToFavorites, updateCartItemQuantity } = useECommerce();
  const { isModalOpen, selectedItem, openModal, closeModal } = useModal();
  const { theme } = useTheme();

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to handle item removal
  const handleRemove = () => {
    removeFromCart(selectedItem);
    closeModal();
  };

  // Function to handle item removal and add to favorites
  const handleRemoveAndAddToFavorites = () => {
    removeFromCart(selectedItem);
    addToFavorites(selectedItem);
    closeModal();
  };

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

  const buttonStyle = {
    backgroundColor: theme === 'dark' ? 'red' : 'green', // Change button background color
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
  };

  return (
    <div className="cart" style={containerStyle}>
      <h1>Cart</h1>
      <div className="cart-items" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {state.cart.map((item) => (
          <div className="cart-item" key={item.id} style={cardStyle}>
            <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div className="cart-item-details" style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="price" style={{ fontWeight: 'bold', color: theme === 'dark' ? 'red' : '#007bff' }}>
                ${item.price}
              </p>
            </div>
            <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                className="quantity-button"
                onClick={() => updateCartItemQuantity({ ...item, quantity: item.quantity - 1 })}
                disabled={item.quantity === 1}
                style={buttonStyle}
              >
                -
              </button>
              <span style={{ fontSize: '1.2rem' }}>{item.quantity}</span>
              <button
                className="quantity-button"
                onClick={() => updateCartItemQuantity({ ...item, quantity: item.quantity + 1 })}
                style={buttonStyle}
              >
                +
              </button>
            </div>
            <button
              className="remove-button"
              onClick={() => openModal(item)}
              style={{ marginTop: '10px', fontSize: '1.2rem', backgroundColor: theme === 'dark' ? 'red' : 'gray' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-subtotal" style={{ backgroundColor: theme === 'dark' ? '#3D426B' : '#F8B88B', padding: '20px', marginTop: '20px' }}>
        <p style={{ fontWeight: 'bold', color: 'white' }}>Subtotal:</p>
        <p>Total: ${calculateTotalPrice().toFixed(2)}</p>
      </div>

      {isModalOpen && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: theme === 'dark' ? '#3D426B' : '#F8B88B', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', position: 'relative' }}>
            <button className="modal-close" onClick={() => closeModal()} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.2rem', color: 'white' }}>
              ✕
            </button>
            <h2 style={{ color: 'white' }}>Confirmation</h2>
            <p style={{ color: 'white' }}>Are you sure you want to remove this item?</p>
            <button onClick={() => handleRemove()} style={{ marginRight: '10px', fontSize: '1.2rem', backgroundColor: theme === 'dark' ? 'red' : 'gray' }}>Remove</button>
            <button onClick={() => handleRemoveAndAddToFavorites()} style={{ fontSize: '1.2rem', backgroundColor: theme === 'dark' ? 'red' : 'gray' }}>Remove and Add to Favorites</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;










