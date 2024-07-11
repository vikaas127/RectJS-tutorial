// ProductView.js
import React from 'react';
import {handleAddToCart} from '../Contexts/HomeController';

const ProductView = ({ products, onProductClick }) => {

   const handleclick = (P_Id, Buy_Quantity ,Price) =>{                           
    console.log("ProductView handleclick Product",products);
    Buy_Quantity = Buy_Quantity || 1;
    // const userId = sessionStorage.getItem('userId'); 
    // const token =sessionStorage.getItem('authToken');
    handleAddToCart(P_Id, Buy_Quantity, Price);           
    console.log("P_Id",P_Id);
    console.log("Buy_Quantity",Buy_Quantity);
    console.log("Price",Price);
    };


    if (!products || products.length === 0) {
        return <div>No products available</div>;
      }

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.P_Id} className='image' onClick={()=> onProductClick(product)}>
                    <a href='/product/:productId'>
                    <img src={product.P_Thumbnail} alt={product.P_Name} />
                    </a>
                    <h3>{product.P_Name}</h3>
                   {/* <p>{product.Desc}</p> */}
                    <p>Price: ₹{product.Price}</p>
                    <div className='stock'>
                    <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
                    </div>                    
                    <button className= 'cart-btn' onClick={() => handleclick( product.P_Id, product.Buy_Quantity , product.Price)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductView;