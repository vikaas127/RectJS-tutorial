import './App.css';
import React, { useState } from 'react';
import Login from './login'; 
import Home from './home'; 
import SignUp from './Signup'; 
import ForgetPassword from './ForgetPassword'; 
import Cart from './Cart';
import ProductDetails from './ProductDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLocation from './Location'; // Correct import for UserLocation
import AccountDetails from './userAccount';


function App() {
  const [userLocation, setUserLocation] = useState([]);

    const handleUpdateUserLocation = (locationData) => {
        setUserLocation(locationData);
    };
  const handleAddToCart = (user_id, product_id, buy_quantity, price) => {
    // Define your handleAddToCart function here or pass it down from Home
    // This function can be passed to ProductDetails via route state or context
  };

  return (
    <Router>
      <div>
          <header userLocation={userLocation} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetails handleAddToCart={handleAddToCart} />} /> 
          <Route path="/account" element={<AccountDetails />} /> 
      </Routes>
      <UserLocation onUpdateUserLocation={handleUpdateUserLocation} />
      </div>
    </Router>
  );
}

export default App;
