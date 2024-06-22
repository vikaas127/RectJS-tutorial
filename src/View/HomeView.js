import React, { useEffect } from 'react';
import '../CSS/styles.css'; // Ensure this path is correct based on your folder structure
import CategoryController from '../Controller/CategoryController';
import ProductController from '../Controller/ProductController';
import HeaderView from './HeaderView';
const HomeView = ({
  userLocation,
  isLogin,
  selectedLanguage,
  handleLanguageChange,
  handleLogout,
  error,
  products,
  handleAddToCart,
  categories, // Categories passed from HomeController
}) => {
  // Example of using categories in useEffect or wherever needed
  
  return (
    <div>
      <HeaderView/>
       <CategoryController />
      <ProductController />
     
    
    </div>
  );
};

export default HomeView;
