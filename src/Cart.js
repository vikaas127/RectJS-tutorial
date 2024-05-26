import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import './Cart.css';
import CartAPIcall from './CartAPI'

const ShoppingCart = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(1);

  useEffect(() => {
    // Fetch product data from API
    CartAPIcall(selectedProduct)
    .then(response => {
      console.log("API response",response)
      setProducts(response); // Use setProducts from home.js
    })
     .catch(error => {
      console.error('Error fetching product list:', error);
    });
  },[selectedProduct]);

  /*const updateQuantity = (id, quantity) => {
    setProducts(products.map(item => item.P_Id === id ? { ...item, Buy_Quantity: quantity } : item));
  };
  const removeItem = (id) => {
    setProducts(products.filter(item => item.P_Id !== id));
  }; */

  const updateQuantity = (id, newQuantity) => {
    setProducts(products.map(item => 
      item.P_Id === id ? { ...item, Quantity: newQuantity, Total_Price: newQuantity * item.Price } : item
    ));
  };
  
  const removeItem = (id) => {
    setProducts(products.filter(item => item.P_Id !== id));
  };

  const getTotalPrice = () => {
    return products.reduce((total, item) =>
      { return total + item.Total_Price }, 0);
    //  return products.reduce((total, item) => total + item.Total_Price * item.quantity, 0);
  };

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {products.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              className="qty-container" updateQuantity={updateQuantity} 
              removeItem={removeItem} 
            />
          ))}
          <div className="cart-total">
            <h3>Total: ₹{getTotalPrice()}</h3>
            <button onClick={() => alert('Proceeding to checkout...')}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
