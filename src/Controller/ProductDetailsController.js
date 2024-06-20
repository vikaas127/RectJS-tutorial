// ProductDetailsController.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetailsModel from '../Context(Model)/ProductDetailsModel';
import ProductDetailsView from '../View/ProductDetailsView';

const ProductDetailsController = ({ handleAddToCart }) => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <ProductDetailsView product={null} handleAddToCart={handleAddToCart} />;
  }

  const productModel = new ProductDetailsModel(product);

  return <ProductDetailsView product={productModel} handleAddToCart={handleAddToCart} />;
};

export default ProductDetailsController;
