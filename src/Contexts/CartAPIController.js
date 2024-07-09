// src/controllers/CartController.js
import React, { useState, useEffect } from 'react';
import CartAPIModel from '../Context(Model)/CartAPIModel';
import CartAPIView from '../View/CartAPIView';

const CartAPIController = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const userId = 2; // Hardcoded for demonstration purposes

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const products = await CartAPIModel.fetchCartProducts(userId);
        fetchCartProducts(products);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, []);

  return <CartAPIView cartProducts={cartProducts} />;
};

export default CartAPIController;
