// FavoriteProductsController.js

import axios from 'axios';

class FavoriteProductsController {
  async fetchFavoriteProducts() {
    try {
      const response = await axios.get('http://localhost:3001/api/FavoriteProducts');
      return response.data;
    } catch (error) {
      console.error('Error fetching favorite products:', error);
      return [];
    }
  }
}

export default FavoriteProductsController;
