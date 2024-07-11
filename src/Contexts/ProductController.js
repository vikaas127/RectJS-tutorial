// ProductController.js
import React, { useState, useEffect } from 'react';
import ProductModel from '../Actions/Product';
import ProductView from '../View/ProductView';
import { useNavigate } from 'react-router-dom';

const ProductController = ({ CatId }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await ProductModel.fetchProductList(CatId);
                console.log("ProductList from ProductController:", productList);
                setProducts(productList);
            } catch (error) {
                console.error('Error setting product list:', error);
            }
        };

        fetchProducts();
    }, [CatId]);

    console.log("Products from ProductController", products);

    const handleProductClick = (product) => {
        navigate('/product-details', { state: { product } });
      };
    
    return <ProductView products={products} onProductClick={handleProductClick} />;
};

export default ProductController;