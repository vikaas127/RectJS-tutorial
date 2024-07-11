// ProductDetailsController.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetailsModel from '../Actions/ProductDetails';
import ProductView from '../View/ProductView';

const ProductDetailsController = ({ handleAddToCart }) => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    console.log("Null products")
    return <ProductView product={null} handleAddToCart={handleAddToCart} />;
  }

  

  const productModel = new ProductDetailsModel(product);

  console.log("productModel on ProductDetailsController", productModel);

  return <ProductView product={productModel} handleAddToCart={handleAddToCart} />;
};

export default ProductDetailsController;
