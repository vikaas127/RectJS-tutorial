import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/ProductDetails`,
        { headers: { 'Content-Type': 'application/json' } }
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Define the handleAddToCart function
  async function handleAddToCart(user_id, product_id, buy_quantity, price) {
    try {
      const response = await axios.post('http://localhost:3001/api/Add_productcart', {
        User_Id: 5,
        P_Id: product_id,
        Buy_Quantity: 7,
        Price: price
      }, { headers: { 'Content-Type': 'application/json' } });
      console.log(response.data.message); // Log success message
      alert("Product added to cart successfully");
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.P_Thumbnail} alt={product.P_Name} />
      <h1>{product.P_Name}</h1>
      <p>{product.Desc}</p>
      <p>Price: ₹{product.Price}</p>
      <p>
        inStock: 
        <span className={product.inStock ? "available" : "unavailable"}>
          {product.inStock ? "Available" : "Unavailable"}
        </span>
      </p>
      <button onClick={() => handleAddToCart(2, product.P_Id, 2, product.Price)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
