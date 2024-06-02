/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ handleAddToCart }) => { // Accept handleAddToCart as a prop

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/ProductDetails', {
          P_Id: productId // Sending the productId in the request body
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(response.data); // Log the response data
        setProduct(response.data.data[0]); // Ensure this is the correct path based on your API response
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>; // Display loading message
  }

  if (!product) {
    return <p>No product details available</p>; // Display message if no product is found
  }

  return (
    <div className="product-detail">
      <img src={product.P_Thumbnail} alt={product.P_Name} width={300} height={300}/>
      <h1>{product.P_Name}</h1>
      <p>{product.Desc}</p>
      <p>Price: ₹{product.Price}</p>
      <p>
        inStock: 
        <span className={product.inStock ? "available" : "unavailable"}>
          {product.inStock ? "Available" : "Unavailable"}
        </span>
      </p>
      <button onClick={() => handleAddToCart(product.User_Id, product.P_Id, product.Buy_Quantity, product.Price)}>Add to Cart</button>
    </div>
  );
};
export default ProductDetails; */

import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({ handleAddToCart }) => { // Accept handleAddToCart as a prop
  const location = useLocation();
  const { product } = location.state || {}; // Retrieve product from location state

  if (!product) {
    return <p>No product details available</p>; // Display message if no product is found
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
          {product.inStock ? "Available" : "Unavailable"}
        </span>
      </p>
      <button onClick={() => handleAddToCart(product.User_Id, product.P_Id, product.Buy_Quantity, product.Price)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
