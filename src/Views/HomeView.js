import React from 'react';
import '../CSS/styles.css'; // Ensure this path is correct based on your folder structure
import CategoryController from '../Controllers/CategoryController';
import ProductController from '../Controllers/ProductController';
import HeaderView from './HeaderView';
import ProductView from '../Views/ProductView';

const HomeView = (
  {
  isLogin,
  products,
  handleAddToCart,
  categories, // Categories passed from HomeController
}
) => {

 
  console.log("products on HomeView",products);
  
  return (
    <div>
      <HeaderView isLogin={isLogin}/>
       <CategoryController categories={categories} />
      <ProductController />
      <ProductView 
      products={products} 
      handleAddToCart={handleAddToCart}     
      />
    </div>
  );
};

export default HomeView;
