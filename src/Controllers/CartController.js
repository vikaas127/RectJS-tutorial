// CartController.js
import React, { useState, useEffect } from 'react';
import CartModel from '../Action/Cart';
import CartView from '../Views/CartView';

const CartController = ({User_Id}) => {
  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (User_Id) {
        try {
          const products = await CartModel.fetchCartProducts(User_Id);
          console.log("products from CartController", products);
          setCartProducts(products);
        } catch (error) {
          console.error('Error fetching cart products:', error);
        }
      } else {
        // Retrieve cart data from localStorage
        const localStorageCart = localStorage.getItem('cart');
        const products = localStorageCart ? JSON.parse(localStorageCart) : [];
        console.log("products from localStorage", products);
        setCartProducts(products);
      }
    };

    fetchCartProducts();
  }, [User_Id]);

  return <CartView cartProducts={cartProducts} />;
};

export default CartController;
