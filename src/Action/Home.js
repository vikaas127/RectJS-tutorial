import axios from 'axios';

export class HomeModel {

  // Product related methods
  static async fetchProducts(categoryId) {
    try {
      const response = await axios.get(`http://localhost:3001/api/products?category=${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }

  static async handleAddToCart(User_Id, P_Id, Buy_Quantity, Price) {
    console.log("handleAddToCart on Home");
    const isLogin = sessionStorage.getItem("isLogin");

    if (isLogin) {
      // console.log("isLogin on HomeModel working", isLogin);
      // console.log("User_Id on home", User_Id);
      // console.log("P_Id on home", P_Id);
      // console.log("Buy_Quantity on home", Buy_Quantity);
      // console.log("Price on home", Price);
      try {
        const response = await axios.post('http://localhost:3001/api/Add_productcart', 
          { User_Id: Number(User_Id), 
            P_Id: Number(P_Id), 
            Buy_Quantity: Number(Buy_Quantity), 
            Price: Number(Price) },          
          { headers: { 'Content-Type': 'application/json' }
        });
        console.log("Add_productcart API response", response);
        if(response.status === 200 ){
          // alert("Products added to the cart successfully");
          console.log("Products added to the cart successfully");
          return response.data;
        } else {
          alert("Failed to store cart data");
          console.error('Failed to store cart data:', response.statusText);
        }
      } catch (error) {
        console.error('Error storing cart data to database:', error);
        alert("An error occurred while storing cart data");
      }  
    }
  }

  static isLogin() {
    return sessionStorage.getItem('isLogin') === 'True';
  }

  static handleLogout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.setItem('isLogin', 'False');
    console.log("handleLogout is working fine, session storage updated");
  }
};
