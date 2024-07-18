// CartModel.js
import axios from 'axios';

class CartModel {
  static async fetchCartProducts(User_Id) {
    console.log("User_Id of fetchCartProducts in CartModel",User_Id);
    try {
      const response = await axios.post('http://localhost:3001/api/Cartproducts', {
        User_Id,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response && Array.isArray(response.data.data)) {
        console.log("Response data from CartModel", response.data.data);
        const cartList = response.data.data.map(item => ({
          P_Id: item.P_Id,
          User_Id: item.User_Id,
          P_Name: item.P_Name,
          Desc: item.Desc,
          inStock: item.inStock,
          Buy_Quantity: item.Buy_Quantity,
          Price: item.Price,
          Total_Price: item.Total_Price,
          P_Thumbnail: item.P_Thumbnail,
        }));
        console.log("CartList from CartModel", cartList);
        return cartList;
      } else {
        console.error("Response data is not an array:", response.data);
        throw new Error("Response data is not an array");
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw error;
    }
  }
}

export default CartModel;
