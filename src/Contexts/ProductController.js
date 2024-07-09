// ProductController.js
import React, { useState, useEffect } from 'react';
import ProductModel from '../Actions/Product';
import ProductView from '../View/ProductView';

const ProductController = ({ CatId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await ProductModel.fetchProductList(CatId);
                setProducts(productList);
            } catch (error) {
                console.error('Error setting product list:', error);
            }
        };

        fetchProducts();
    }, [CatId]);

    return <ProductView products={products} />;
};

export default ProductController;
