// CategoryModel.js
import axios from 'axios';

class CategoryModel {
  static async fetchCategories() {
    try {
      const response = await axios.get('http://localhost:3001/api/Categorylist');
      if (response && Array.isArray(response.data.data)) {
        return response.data.data.map(item => ({
          Cat_Id: item.Cat_Id,
          Cat_Name: item.Cat_Name,
          Cat_Image: item.Cat_Image
        }));
      } else {
        console.error("Expected an array but got:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories", error);
      return [];
    }
  }
}

export default CategoryModel;
