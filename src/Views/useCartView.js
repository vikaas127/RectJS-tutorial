import React, { useEffect } from 'react';
import CartItemView from '../View/CartItemView';

const useCartView = ({ cartItems, updateQuantity, removeItem, fetchCartData }) => {
  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div className="cart">
      {cartItems.map((item) => (
        <CartItemView
          key={item.P_Id}
          item={item}
          quantity={item.Buy_Quantity}
          totalPrice={item.Buy_Quantity * item.Price}
          handleQuantityChange={(newQuantity) => updateQuantity(item.P_Id, newQuantity)}
          handleRemoveItem={removeItem}
        />
      ))}
    </div>
  );
};

export default useCartView;
