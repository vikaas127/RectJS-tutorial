// src/controllers/CartAPIController.js
{/* import React, { useState, useEffect } from 'react';
import CartAPIModel from '../Actions/CartAPIModel';
import CartAPIView from '../View/CartAPIView';

const CartAPIController = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const userId = 2; // Hardcoded for demonstration purposes

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const products = await CartAPIModel.fetchCartProducts(userId);
        console.log("products from CartAPIController",products);
        setCartProducts(products);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, [userId]);

  return <CartAPIView cartProducts={cartProducts} />;
};

export default CartAPIController;
*/}