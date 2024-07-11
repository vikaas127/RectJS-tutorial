import React from 'react';
import '../CSS/styles.css'; // Ensure this path is correct based on your folder structure
import CategoryController from '../Contexts/CategoryController';
import ProductController from '../Contexts/ProductController';
import HeaderView from './HeaderView';
import ProductView from '../View/ProductView';
import { useNavigate } from 'react-router-dom';

const HomeView = (
  {
  isLogin,
  products,
  handleAddToCart,
  categories, // Categories passed from HomeController
}
) => {
  const navigate = useNavigate(); // Initialize useHistory

  // Function to handle product image click
  const handleProductClick = (productId) => {
    console.log("Product clicked",productId);
    navigate(`/product/${productId}`);
  };

  console.log("products on HomeView",products);
  
  return (
    <div>
      <HeaderView isLogin={isLogin}/>
       <CategoryController categories={categories} />
      <ProductController />
      <ProductView 
      products={products} 
      handleAddToCart={handleAddToCart}
      onProductClick={handleProductClick}
      />
    </div>
  );
};

export default HomeView;
