// ProductView.js
import React from 'react';
import handleAddToCart from '../View/HomeView';


const ProductView = ({ products }) => {
    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.P_Id} className="product-item">
                    <img src={product.P_Thumbnail} alt={product.P_Name} />
                    <h3>{product.P_Name}</h3>
                   {/* <p>{product.Desc}</p> */}
                    <p>Price: ₹{product.Price}</p>
                    <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
                    <button className= 'cart-btn' onClick={() => handleAddToCart(product.User_Id, product.P_Id, product.Buy_Quantity, product.Price)}>Add to Cart</button>
                </div>
                
            ))}
        </div>
    );
};

export default ProductView;
