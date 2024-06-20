import { useState } from 'react';
import CartItemModel from '../Context(Model)/CartItemModel';

const useCartController = () => {
  const [CartItems, setCartItems] = useState([]);

  const fetchCartData = async () => {
    try {
      const data = await CartItemModel.fetchCartData(2); // Replace 2 with actual user id
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.P_Id === productId ? { ...item, Buy_Quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.P_Id !== productId));
  };

  return {
    CartItems,
    fetchCartData,
    updateQuantity,
    removeItem,
  };
};

export default useCartController;
