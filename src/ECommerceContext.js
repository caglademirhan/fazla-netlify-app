import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  favorites: [], // Add favorites array
  cart: [],
};

const ECommerceContext = createContext();

const ACTION_TYPES = {
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
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
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
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

  return (
    <ECommerceContext.Provider
      value={{
        state,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
}

export function useECommerce() {
  return useContext(ECommerceContext);
}

