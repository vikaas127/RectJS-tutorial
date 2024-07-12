// ProductController.js
import React, { useState, useEffect } from 'react';
import ProductModel from '../Action/Product';
import ProductView from '../Views/ProductView';
import { useNavigate } from 'react-router-dom';

const ProductController = ({ category }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    console.log("Cat_Id Recieved on ProductController",category);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await ProductModel.fetchProductList(category);
                console.log("ProductList from ProductController:", productList);
                setProducts(productList);
            } catch (error) {
                console.error('Error setting product list:', error);
            }
        };

        fetchProducts();
    }, [category]);

    console.log("Products from ProductController", products);

    const handleProductClick = (product) => {
        navigate('/product-details', { state: { product } });
      };
    
    return <ProductView products={products} onProductClick={handleProductClick} />;
};

export default ProductController;