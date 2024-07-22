import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetailsModel from '../Action/ProductDetails';
import ProductView from '../Views/ProductView';
import ProductDetailsView from '../Views/ProductDetailsView';

const ProductDetailsController = ({ handleAddToCart }) => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <ProductView product={null} handleAddToCart={handleAddToCart} />;
  }

  const productModel = new ProductDetailsModel(product);

  return <ProductDetailsView product={productModel} handleAddToCart={handleAddToCart} />;
};

export default ProductDetailsController;
