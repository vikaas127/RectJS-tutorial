import React, { createContext, useReducer } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  favoriteProducts: [],
  error: null,
};

// Actions
const SET_FAVORITE_PRODUCTS = 'SET_FAVORITE_PRODUCTS';
const SET_ERROR = 'SET_ERROR';

// Reducer
const favoriteProductsReducer = (state, action) => {
  switch (action.type) {
    case SET_FAVORITE_PRODUCTS:
      return { ...state, favoriteProducts: action.payload, error: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const FavoriteProductsContext = createContext();

export const FavoriteProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteProductsReducer, initialState);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/FavoriteProducts');
      dispatch({ type: SET_FAVORITE_PRODUCTS, payload: response.data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: 'Error fetching favorite products' });
      console.error('Error fetching favorite products:', error);
    }
  };

  return (
    <FavoriteProductsContext.Provider value={{ state, fetchFavoriteProducts }}>
      {children}
    </FavoriteProductsContext.Provider>
  );
};
