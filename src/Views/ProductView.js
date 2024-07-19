// ProductView.js
import React from 'react';
import {handleAddToCart} from '../Controllers/HomeController';

const ProductView = ({ products, onProductClick, User_Id }) => {

    console.log("ProductView handleclick Product",products);
    
   const handleclick = ( User_Id, P_Id, Buy_Quantity ,Price) =>{                          
    Buy_Quantity = Buy_Quantity || 1;
    console.log("User_Id",User_Id);
    console.log("P_Id",P_Id);
    console.log("Buy_Quantity",Buy_Quantity);
    console.log("Price",Price);
    
    handleAddToCart(User_Id, P_Id, Buy_Quantity, Price);           
    console.log("User_Id",User_Id);
    console.log("P_Id",P_Id);
    console.log("Buy_Quantity",Buy_Quantity);
    console.log("Price",Price);
    };

    if (!products || products.length === 0) {
        return <div></div>;
      }

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
                    <button className= 'cart-btn' onClick={() => handleclick(User_Id, product.P_Id, product.Buy_Quantity , product.Price)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductView;