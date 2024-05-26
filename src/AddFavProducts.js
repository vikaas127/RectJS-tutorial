import React from 'react';
import axios from 'axios';

const AddToFavorites = ({ productId }) => {
  const handleAddToFavorites = async () => {
    try {
      await axios.post('http://localhost:3001/api/AddFavourites', { productId });
      alert('Product added to favorites!');
    } catch (error) {
      console.error('Error adding product to favorites:', error);
    }
  };

  return (
    <button onClick={handleAddToFavorites}>Add to Favorites</button>
  );
};

export default AddToFavorites;
