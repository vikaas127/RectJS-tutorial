// For MVC process

import React from 'react';
import CartItemView from '../src/View/CartItemView';
import CartItemModel from '../src/Context(Model)/CartItemModel'; // Assuming you have data like this

const Cart = () => {
  // Assuming you have cartItems as an array of CartItemModel instances
  const cartItems = [
    new CartItemModel({ P_Id: 1, P_Name: 'Product 1', Price: 100, Buy_Quantity: 2, P_Thumbnail: 'thumbnail.jpg' }),
    new CartItemModel({ P_Id: 2, P_Name: 'Product 2', Price: 50, Buy_Quantity: 1, P_Thumbnail: 'thumbnail2.jpg' }),
  ];

  return (
    <div className="cart">
      {cartItems.map((item) => (
        <CartItemView key={item.P_Id} item={item} />
      ))}
    </div>
  );
};

export default Cart;
