import React from 'react';
import '../CSS/styles.css'; // Ensure this path is correct based on your folder structure
import CategoryController from '../Contexts/CategoryController';
import ProductController from '../Contexts/ProductController';
import HeaderView from './HeaderView';
import ProductView from '../View/ProductView';

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
