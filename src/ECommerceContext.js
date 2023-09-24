import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  favorites: [],
  cart: [], // Include quantity for items in the cart
};

const ECommerceContext = createContext();

const ACTION_TYPES = {
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM_QUANTITY: 'UPDATE_CART_ITEM_QUANTITY', // New action type
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case ACTION_TYPES.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload.id),
      };
    case ACTION_TYPES.ADD_TO_CART:
      const existingCartItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);

      if (existingCartItemIndex !== -1) {
        // If item already exists in cart, update quantity
        const updatedCart = [...state.cart];
        updatedCart[existingCartItemIndex].quantity += 1;

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If item is not in cart, add it with quantity 1
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case ACTION_TYPES.UPDATE_CART_ITEM_QUANTITY:
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );

      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return state;
  }
};

export function ECommerceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToFavorites = (product) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_FAVORITES, payload: product });
  };

  const removeFromFavorites = (product) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_FAVORITES, payload: product });
  };

  const addToCart = (product) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART, payload: product });
  };

  // New function to update item quantity in the cart
  const updateCartItemQuantity = (product) => {
    dispatch({ type: ACTION_TYPES.UPDATE_CART_ITEM_QUANTITY, payload: product });
  };

  return (
    <ECommerceContext.Provider
      value={{
        state,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
        updateCartItemQuantity, // Add the new function to the context value
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
}

export function useECommerce() {
  return useContext(ECommerceContext);
}


