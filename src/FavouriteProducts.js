import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteProducts = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/FavoriteProducts');
      setFavoriteProducts(response.data);
    } catch (error) {
      console.error('Error fetching favorite products:', error);
    }
  };

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
