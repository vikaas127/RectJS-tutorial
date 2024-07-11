import React from 'react';
import '../CSS/styles.css'; // Ensure this path is correct based on your folder structure
import CategoryController from '../Contexts/CategoryController';
import ProductController from '../Contexts/ProductController';
import HeaderView from './HeaderView';
import ProductView from '../View/ProductView';
import UserLocationController from '../Contexts/UserLocationController';

const HomeView = (
  {
  LocationData,
  isLogin,
  selectedLanguage,
  handleLanguageChange,
  handleLogout,
  error,
  products,
  handleAddToCart,
  categories, // Categories passed from HomeController
}
) => {
  // Example of using categories in useEffect or wherever needed
  
  return (
    <div>
      <HeaderView isLogin={isLogin}/>
       <CategoryController categories={categories} />
      <ProductController />
      <ProductView products={products} handleAddToCart={handleAddToCart}/>
      {/* <UserLocationController LocationData={LocationData}/> */}
    </div>
  );
};

export default HomeView;
