import './App.css';
import './Signup.css';
import './login.css'
import './CSS/home.css'; 
import './CategoryList.css';
import './ProductDetails.css';
import './Header.css';
import HeaderView from './View/HeaderView';
import React, { useState } from 'react';
import HomeView from '../src/View/HomeView'; 
import SignUpView from '../src/View/SignUpView';
import LoginController from '../src/Controller/LoginController';
import cartCartController from './Controller/useCartController';
import ProductController from '../src/Controller/ProductController';
import ForgetPassword from './ForgetPassword'; 
import CartItemView from '../src/View/CartItemView';
import CartItemController from '../src/Controller/CartItemController';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeController from './Controller/HomeController';
import UserLocation from './Location'; 
import AccountDetails from './userAccount';
import ProductDetailsController from './Controller/ProductDetailsController';
import ProductDetailsView from './View/ProductDetailsView';
import Header from './View/UserView(Header)';

// import TrialForm from './TrialForm';


function App() {
  const [userLocation, setUserLocation] = useState([]);

  const { CartItems, fetchCartData, updateQuantity, removeItem } = cartCartController();

    const handleUpdateUserLocation = (locationData) => {
        setUserLocation(locationData);
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
          <Route path="/forgetpassword" element={<ForgetPassword />} /> 
          <Route path="/product-details" element={<ProductDetailsController handleAddToCart={handleAddToCart} />}/> 
          <Route path="/product/:productId" element={<ProductDetailsView handleAddToCart={handleAddToCart} />} />   
      </Routes>
     {/*   <UserLocation onUpdateUserLocation={handleUpdateUserLocation} /> 
      {CartItems.map(item => (
        <CartItems key={item.P_Id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
      ))}*/}
      </div>
      
     
    </Router>  
  );
}

{/*<TrialForm />*/}

export default App;
