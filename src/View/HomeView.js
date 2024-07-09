import React from 'react';
import '../CSS/styles.css'; // Ensure this path is correct based on your folder structure
import CategoryController from '../Contexts/CategoryController';
import ProductController from '../Contexts/ProductController';
import HeaderView from './HeaderView';
import UserLocationController from '../Contexts/UserLocationController';
const HomeView = (
//   {
//   userLocation,
//   isLogin,
//   selectedLanguage,
//   handleLanguageChange,
//   handleLogout,
//   error,
//   products,
//   handleAddToCart,
//   categories, // Categories passed from HomeController
// }
) => {
  // Example of using categories in useEffect or wherever needed
  
  return (
    <div>
      <HeaderView/>
       <CategoryController />
      <ProductController />
      <UserLocationController/>
    </div>
  );
};

export default HomeView;
