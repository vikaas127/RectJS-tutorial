import { useState, useEffect } from 'react';
import '../CSS/styles.css';
import CategoryModel from '../Action/Category';
import ProductController from '../Controllers/ProductController';
import CategoryListView from '../Views/CategoryListView';

const CategoryController = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await CategoryModel.fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    console.log("handleCategoryClick working",category);
    setSelectedCategory(category);
  };

    return <div>
      <CategoryListView categories={categories} onCategoryClick={handleCategoryClick} />
      {selectedCategory && <ProductController category={selectedCategory} />};
    </div>
};

export default CategoryController;
