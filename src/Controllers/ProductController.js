// ProductController.js
import React, { useState, useEffect } from 'react';
import ProductModel from '../Action/Product';
import ProductView from '../Views/ProductView';
import { useNavigate } from 'react-router-dom';
import HomeController from './HomeController';
import { handleAddToCart } from './HomeController';

const ProductController = ({ category, searchTerm, User_Id }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = async () => {
            console.log("Fetching products with category:", category);
            console.log("Fetching products with searchTerm:", searchTerm);
            setProducts([]);
            try {
                const productList = await ProductModel.fetchProductList(category, searchTerm)
                console.log("productList on ProductController",productList);
                setProducts(productList);
            } catch (error) {
                console.error('Error setting product list:', error);
            }
        };

        fetchProducts();
    }, [category, searchTerm]);

    useEffect(() => {
        console.log("Number of products:", products.length);
    }, [products]);

    const handleProductClick = (product) => {
        navigate('/product-details', { state: { product } });
      };

      const addToCart = (product) => {
        const { P_Id, P_Name, Desc, Price, P_Thumbnail } = product;
        handleAddToCart(User_Id, P_Id, 1, Price, P_Name, Desc, P_Thumbnail);
      };
    
    return (
        <>
          <ProductView products={products} onProductClick={handleProductClick} addToCart={addToCart} User_Id={User_Id} />
          <HomeController products={products} />
        </>
      );
};

export default ProductController;