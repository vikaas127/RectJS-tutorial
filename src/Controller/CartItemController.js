import { useState } from 'react';
import CartItemModel from '../Context(Model)/CartItemModel';

const CartItemController = (item, updateQuantity, removeItem) => {
  const [quantity, setQuantity] = useState(item.Buy_Quantity);
  const [totalPrice, setTotalPrice] = useState(item.Buy_Quantity * item.Price);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity >= 1) {
      try {
        const success = await CartItemModel.updateCartProduct(2, item.P_Id, newQuantity);
        if (success) {
          setQuantity(newQuantity);
          setTotalPrice(newQuantity * item.Price);
          updateQuantity(item.P_Id, newQuantity);
        } else {
          console.error('Failed to update quantity in the database');
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const success = await CartItemModel.removeCartProduct(productId);
      if (success) {
        removeItem(productId);
      } else {
        console.error('Failed to delete the product from the database');
      }
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  return {
    quantity,
    totalPrice,
    handleQuantityChange,
    handleRemoveItem,
  };
};

export default CartItemController;
