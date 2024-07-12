import './App.css';
import './Signup.css';
import './login.css';
import './CSS/home.css'; 
import './CategoryList.css';
import './ProductDetails.css';
import './Header.css';
import './CSS/cart.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './Views/HomeView'; 
import SignUpView from './Views/SignUpView';
import LoginController from './Controllers/LoginController';
import CartItemController from './Controllers/CartItemController';
import ProductDetailsView from './Views/ProductDetailsView';
import HomeController from './Controllers/HomeController';
import AccountDetailsController from './Controllers/AccountDetailsController';

const App = () => {
  const [cartProducts, setCartProducts] = useState([
    { P_Id: 1, P_Thumbnail: 'thumb1.jpg', P_Name: 'Product 1', Price: 100, Buy_Quantity: 2, Total_Price: 200 },
    // Add more products here
  ]);

  const setTotalPrice = (productId, newTotalPrice) => {
    setCartProducts(prevProducts => 
      prevProducts.map(product =>
        product.P_Id === productId ? { ...product, Total_Price: newTotalPrice } : product
      )
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartProducts(prevProducts => 
      prevProducts.map(product =>
        product.P_Id === productId ? { ...product, Buy_Quantity: newQuantity } : product
      )
    );
  };

  const removeItem = (productId) => {
    setCartProducts(prevProducts => 
      prevProducts.filter(product => product.P_Id !== productId)
    );
  };

  const handleAddToCart = (userId, productId, quantity, price) => {
    // Implement the logic to add product to cart
    console.log(`User ${userId} added product ${productId} with quantity ${quantity} and price ${price} to the cart.`);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<HomeView /> } />
          <Route path="/cart" element={
          <CartItemController 
              cartProducts={cartProducts} 
              setTotalPrice={setTotalPrice}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          } />
          <Route path="/login" element={<LoginController />} />
          <Route path="/" element={<HomeController />} />
          <Route path="/Signup" element={<SignUpView />} /> 
          <Route path="/Account" element={<AccountDetailsController />} />            
          <Route path="/product-details" element={<ProductDetailsView handleAddToCart={handleAddToCart}/>} />
        </Routes>  
      </div>     
    </Router>  
  );
};

export default App;
