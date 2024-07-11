import { useState, useEffect } from 'react';
import CategoryModel from '../Actions/Category';
import '../CSS/styles.css';
import CategoryListView from '../View/CategoryListView';

const CategoryController = () => {
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

  
    return <CategoryListView categories={categories} />;
};

export default CategoryController;
