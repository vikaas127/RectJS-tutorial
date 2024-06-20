// CategoryController.js
import CategoryModel from '../Context(Model)/CategoryModel';

class CategoryController {
  static async getCategories() {
    return await CategoryModel.fetchCategories();
  }
}

export default CategoryController;
