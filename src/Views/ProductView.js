// ProductView.js
import React from 'react';
import {handleAddToCart} from '../Controllers/HomeController';

const ProductView = ({ products, onProductClick, User_Id }) => {
    const Buy_Quantity = 1;
    console.log("ProductView handleclick Product",products);

    
    const handleclick = (User_Id, P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail) => {
        console.log("products on productview", { P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail });
        handleAddToCart(User_Id, P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail);
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.P_Id} className='image'>
                    <img src={product.P_Thumbnail} alt={product.P_Name} onClick={()=> onProductClick(product)}/>
                    <h3>{product.P_Name}</h3>
                   {/* <p>{product.Desc}</p> */}
                    <p>Price: ₹{product.Price}</p>
                    <div className='stock'>
                    <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
                    </div>                    
                    <button className= 'cart-btn' onClick={() => handleclick(User_Id, product.P_Id, product
                        .P_Name, product.Desc, Buy_Quantity, product.Price, product.P_Thumbnail)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductView;