// CartModel.js

import axios from 'axios';

class CartModel {
    constructor() {
        this.apiUrl = 'http://localhost:3001/api/Cartproducts';
    }

    async fetchCartData(userId) {
        try {
            const response = await axios.post(this.apiUrl, {
                User_Id: userId,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response && Array.isArray(response.data.data)) {
                return response.data.data.map(item => ({
                    P_Id: item.P_Id,
                    Cat_Id: item.Cat_Id,
                    P_Name: item.P_Name,
                    Desc: item.Desc,
                    inStock: item.inStock,
                    Buy_Quantity: item.Buy_Quantity,
                    Price: item.Price,
                    Total_Price: item.Total_Price,
                    P_Thumbnail: item.P_Thumbnail
                }));
            } else {
                throw new Error("Response data is not an array");
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            throw error;
        }
    }
}

export default CartModel;
