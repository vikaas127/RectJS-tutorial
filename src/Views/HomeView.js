import React from 'react';
import '../CSS/styles.css'; // Ensure this path is correct based on your folder structure
import ProductView from '../Views/ProductView';

const HomeView = (
  {
  products,
  handleAddToCart,
}
) => {
  
  return (
    <div>
      <ProductView 
      products={products} 
      handleAddToCart={handleAddToCart}     
      />
    </div>
  );
};

export default HomeView;
