import React from 'react';
import CartView from '../Views/CartView'; // Ensure the path is correct

const CartItemController = ({ cartProducts, setTotalPrice, updateQuantity, removeItem }) => {
  console.log("cartProducts from CartItemController", cartProducts);
  console.log("setTotalPrice from CartItemController", setTotalPrice);
  console.log("updateQuantity from CartItemController", updateQuantity);
  console.log("removeItem from CartItemController", removeItem);

  const updateQuantity = async (User_Id, productId, newQuantity) => {
    console.error('User_Id updatequantity in the CartItemController',User_Id);
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

  const removeItem = async (productId) => {
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
