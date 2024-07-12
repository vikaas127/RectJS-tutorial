// FavoriteProducts.js

import React, { useState, useEffect } from 'react';
import FavoriteProductModel from '../Action/FavoriteProduct';
import FavoriteProductsController from '../Controllers/FavoriteProductsController';

const FavoriteProducts = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const controller = new FavoriteProductsController();

    const fetchData = async () => {
      const data = await controller.fetchFavoriteProducts();
      const mappedProducts = data.map(product => 
        new FavoriteProductModel(product.id, product.name, product.image)
      );
      setFavoriteProducts(mappedProducts);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Favorite Products</h2>
      <div>
        {favoriteProducts.map(product => (
          <div key={product.id}>
            <p>{product.name}</p>
            <img src={product.image} alt={product.name} />
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
