// src/models/CartAPIModel.js
{/* import axios from 'axios';

class CartAPIModel {
  static async fetchCartProducts(userId) {
    console.log("fetchCartProducts userId",userId);
    try {
      const response = await axios.post('http://localhost:3001/api/Cartproducts', {
        User_Id: 2,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response && Array.isArray(response.data.data)) {
        const cartList = response.data.data.map(item => ({
          P_Id: item.P_Id,
          Cat_Id: item.Cat_Id,
          P_Name: item.P_Name,
          Desc: item.Desc,
          inStock: item.inStock,
          Buy_Quantity: item.Buy_Quantity,
          Price: item.Price,
          Total_Price: item.Total_Price,
          P_Thumbnail: item.P_Thumbnail,
        }));
        console.log("CartList from CartAPIModel", cartList);
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

export default CartAPIModel;
*/}