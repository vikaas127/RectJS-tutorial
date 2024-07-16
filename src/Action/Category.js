import axios from 'axios';

const CategoryModel = {
  async fetchCategories() {
    try {
      const response = await axios.get('http://localhost:3001/api/Categorylist');
      if (response && response.data && Array.isArray(response.data.data)) {
        const categoryList =   response.data.data.map(item => ({
          Cat_Id: item.Cat_Id,
          Cat_Name: item.Cat_Name,
          Cat_Image: item.Cat_Image
        }));
        // console.log("category List from API:", categoryList);
     return categoryList;
      } else {
        console.error("Expected an array but got:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories", error);
      return [];
    }
  }
};

export default CategoryModel;
