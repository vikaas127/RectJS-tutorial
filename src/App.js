import './App.css';
import './Signup.css';
import './login.css'
import './CSS/home.css'; 
import './CategoryList.css';
import './ProductDetails.css';
import './Header.css';
import './CSS/cart.css';
import React, { useState } from 'react';
import HomeView from '../src/View/HomeView'; 
import SignUpView from '../src/View/SignUpView';
import LoginController from '../src/Contexts/LoginController';
import CartController from './Contexts/CartController';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetailsController from './Contexts/ProductDetailsController';
import ProductDetailsView from './View/ProductDetailsView';
import HomeController from '../src/Contexts/HomeController';
import AccountDetailsController from './Contexts/AccountDetailsController';

function App() {

    const handleAddToCart = (userId, productId, quantity, price) => {
      // Implement the logic to add product to cart
      console.log(`User ${userId} added product ${productId} with quantity ${quantity} and price ${price} to the cart.`);
    };

  return (
    <Router>
      <div>         
      <Routes>
          <Route path="/home" element={<HomeView />} />
          <Route path="/cart" element={<CartController />} />
          <Route path="/login" element={<LoginController />} />
          <Route path="/" element={<HomeController />} />
          <Route path="/Signup" element={<SignUpView />} /> 
          <Route path="/Account" element={<AccountDetailsController />} />            
          <Route path="/product-details" element={<ProductDetailsView />} />
          <Route path="/product/:productId" element={<ProductDetailsView handleAddToCart={handleAddToCart}  />} />   
      </Routes>
      </div>     
    </Router>  
  );
};

export default App;
