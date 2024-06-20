// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './ProductDetails.css';

// const ProductDetails = ({ handleAddToCart }) => { // Accept handleAddToCart as a prop
//   const location = useLocation();
//   const { product } = location.state || {}; // Retrieve product from location state

//   if (!product) {
//     return <p>No product details available</p>; // Display message if no product is found
//   }

//   return (
//     <div className="product-detail">
//       <img src={product.P_Thumbnail} alt={product.P_Name} width={300} height={300} />
//       <h1>{product.P_Name}</h1>
//       <p>{product.Desc}</p>
//       <p>Price: ₹{product.Price}</p>
//       <p>
//         inStock: 
//         <span className={product.inStock ? "available" : "unavailable"}>
//           {product.inStock ? "Available" : "Unavailable"}
//         </span>
//       </p>
//       <button onClick={() => handleAddToCart(product.User_Id, product.P_Id, product.Buy_Quantity, product.Price)}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductDetails;
