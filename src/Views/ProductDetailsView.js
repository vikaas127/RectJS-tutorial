// ProductDetailsView.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetailsView = ({User_Id, handleAddToCart, setCartItemCount}) => {
 // Get productId from URL params
 const location = useLocation();
  const { product } = location.state;
  const Buy_Quantity = 1;

  console.log("User_Id on ProductViewDetails",User_Id);
 console.log("ProductView Product",product.P_Id);
 console.log("ProductView Product Price",product.Price);
 console.log("ProductView Product Buy_Quantity",Buy_Quantity);

  if (!product) {
    return <p>Loading....</p>;
  }

  const handleclick = (User_Id, P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail) => {
    console.log("products on ProductDetailsView", { P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail });
    console.log("ProductViewDetails handleAddToCart",handleAddToCart);
    handleAddToCart(User_Id, P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail);
};

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
      <button onClick={() => handleclick(User_Id, product.P_Id, product.P_Name, product.Desc, Buy_Quantity, product.Price, product.P_Thumbnail)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailsView;