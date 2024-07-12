// CartController.js
import React, { useState, useEffect } from 'react';
import CartModel from '../Action/Cart';
import CartView from '../Views/CartView';

const CartController = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const User_Id = 2; // Hardcoded for demonstration purposes

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const products = await CartModel.fetchCartProducts(User_Id);
        console.log("products from CartController",products);
        setCartProducts(products);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, [User_Id]);

  return <CartView cartProducts={cartProducts} />;
};

export default CartController;
