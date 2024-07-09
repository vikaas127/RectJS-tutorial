import CartItem from '../Actions/CartItem';
import CartView from '../View/CartView';

const CartItemController = ({ cartProducts, updateQuantity, removeItem }) => {
  
  const handleQuantityChange = async (productId, newQuantity) => {
    const item = cartProducts.find(product => product.P_Id === productId);
    if (item && newQuantity >= 1) {
      try {
        const success = await CartItem.updateCartProduct(2, productId, newQuantity);
        if (success) {
          setTotalPrice(newQuantity * item.Price);
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
      const success = await CartItem.removeCartProduct(productId);
      if (success) {
        console.log("HandleRemoveItem from CartItemController", success)
        removeItem(productId);
      } else {
        console.error('Failed to delete the product from the database');
      }
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  return (
    <CartView
    cartProducts={cartProducts}
    handleQuantityChange={handleQuantityChange}
    handleRemoveItem={handleRemoveItem}
  />
  );
};

export default CartItemController;
