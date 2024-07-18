import { useState, useEffect } from 'react';
import '../CSS/styles.css';
import CategoryModel from '../Action/Category';
import CategoryListView from '../Views/CategoryListView';

const CategoryController = ({handleCategory}) => {
  const [categories, setCategories] = useState([]);

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

    return <div>
      <CategoryListView categories={categories} handleCategory={handleCategory} />
    </div>
};

export default CategoryController;
