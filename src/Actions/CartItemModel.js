import axios from 'axios';

const updateCartProduct = async (userId, productId, newQuantity) => {
  try {
    const response = await axios.put('http://localhost:3001/api/Update_Cartproduct', {
      User_Id: userId,
      P_Id: productId,
      Buy_Quantity: newQuantity,
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error updating quantity:', error);
    throw error;
  }
};

const removeCartProduct = async (productId) => {
  try {
    const response = await fetch('http://localhost:3001/api/Del_CartProduct', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ P_Id: productId }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting the product:', error);
    throw error;
  }
};

const fetchCartData = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/Get_Cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    throw error;
  }
};

export default {
  updateCartProduct,
  removeCartProduct,
  fetchCartData,
};
