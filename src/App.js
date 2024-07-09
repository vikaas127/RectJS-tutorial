import './App.css';
import './Signup.css';
import './login.css'
import './CSS/home.css'; 
import './CategoryList.css';
import './ProductDetails.css';
import './Header.css';
import React, { useState } from 'react';
import HomeView from '../src/View/HomeView'; 
import SignUpView from '../src/View/SignUpView';
import LoginController from '../src/Contexts/LoginController';
import CartItemController from './Contexts/CartItemController';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetailsController from './Contexts/ProductDetailsController';
import ProductView from './View/ProductView';
import HomeController from '../src/Contexts/HomeController';
import useCartController from '../src/Contexts/useCartController';


function App() {
  const [userLocationData, setUserLocationData] = useState([]);

  const { CartItems, fetchCartData, updateQuantity, removeItem } = useCartController();

    const handleUpdateUserLocation = (userLocationData) => {
      console.log("handleUpdateUserLocation",handleUpdateUserLocation);
      setUserLocationData(userLocationData);
    };

    const handleAddToCart = (userId, productId, quantity, price) => {
      // Implement the logic to add product to cart
      console.log(`User ${userId} added product ${productId} with quantity ${quantity} and price ${price} to the cart.`);
    };

  return (
    <Router>
      <div>         
      <Routes>
          <Route path="/home" element={<HomeView />} />
          <Route path="/cart" element={<CartItemController />} />
          <Route path="/login" element={<LoginController />} />
          <Route path="/" element={<HomeController />} />
          <Route path="/Signup" element={<SignUpView />} /> 
           
          <Route path="/product-details" element={<ProductDetailsController handleAddToCart={handleAddToCart} />}/> 
          <Route path="/product/:productId" element={<ProductView handleAddToCart={handleAddToCart} />} />   
      </Routes>
      </div>     
    </Router>  
  );
};
export default App;
