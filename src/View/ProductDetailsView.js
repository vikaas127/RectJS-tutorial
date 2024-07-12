// ProductDetailsView.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetailsView = (handleAddToCart) => {
 // Get productId from URL params
 const location = useLocation();
  const { product } = location.state;

 console.log("ProductView Product",product.P_Id);


  if (!product) {
    return <p>Loading....</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.P_Thumbnail} alt={product.P_Name} width={300} height={300} />
      <h1>{product.P_Name}</h1>
      <p>{product.Desc}</p>
      <p>Price: ₹{product.Price}</p>
      <p>
        inStock: 
        <span className={product.inStock ? "available" : "unavailable"}>
          {/* {product.isAvailable()} */}
        </span>
      </p>
      <button onClick={() => handleAddToCart(product.User_Id, product.P_Id, product.Buy_Quantity, product.Price)}>Add to Cart</button>
   
    </div>
  );
};

export default ProductDetailsView;