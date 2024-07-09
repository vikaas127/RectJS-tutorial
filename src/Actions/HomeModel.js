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

  static async handleAddToCart(product) {
    const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in sessionStorage
    const isLogin = this.isLogin();

    if (!userId) {
      alert("User ID not found. Please try again.");
      return;
    }

    let cart = localStorage.getItem('cart');

    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:3001/api/Add_productcart', cart, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log("Response", response);
          alert("Product added to cart and stored successfully");
        } else {
          alert("Failed to store cart data");
          console.error('Failed to store cart data:', response.statusText);
        }
      } catch (error) {
        console.error('Error storing cart data to database:', error);
        alert("An error occurred while storing cart data");
      }
    } else {
      try {
        cart = cart ? JSON.parse(cart) : [];
      } catch (e) {
        console.error('Error parsing cart data from local storage:', e);
        cart = [];
      }

      const existingProductIndex = cart.findIndex(item => item.P_Id === product.P_Id);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].Buy_Quantity += 1;
      } else {
        cart.push({ ...product, Buy_Quantity: 1, User_Id: userId });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
  
  static isLogin() {
    return sessionStorage.getItem('isLogin') === 'True';
  }

  static handleLogout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.setItem('isLogin', 'False');
  }
}
