import React from 'react';
import CartView from '../View/CartView'; // Ensure the path is correct

const CartItemController = ({ cartProducts, setTotalPrice, updateQuantity, removeItem }) => {

  const handleQuantityChange = async (productId, newQuantity) => {
    const item = cartProducts.find(product => product.P_Id === productId);
    if (item && newQuantity >= 1) {
      try {
        // Mocking the API call success
        const success = true; // Simulate successful API response
        console.log("Success of handleQuantityChange from CartItemController", success);
        if (success) {
          setTotalPrice(productId, newQuantity * item.Price);
          updateQuantity(productId, newQuantity);
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
      // Mocking the API call success
      const success = true; // Simulate successful API response
      console.log("Success of handleRemoveItem from CartItemController", success);
      if (success) {
        removeItem(productId);
      } else {
        console.error('Failed to delete the product from the database');
      }
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  console.log("cartProducts from CartItemController",cartProducts);
  
  return (
    <CartView
      cartProducts={cartProducts}
      handleQuantityChange={handleQuantityChange}
      handleRemoveItem={handleRemoveItem}
    />
  );
};

export default CartItemController;
