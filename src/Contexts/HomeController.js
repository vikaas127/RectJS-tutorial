import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeModel } from '../Actions/Home';
import HomeView from '../View/HomeView'; 
import UserLocationModel from '../Actions/UserLocation';

export const handleAddToCart = async (P_Id, Buy_Quantity ,Price) => {
  const token = sessionStorage.getItem('authToken');      
 // console.log("User_Id on HomeController", User_Id);
  console.log("P_Id on HomeController", P_Id);
  console.log("Buy_Quantity on HomeController", Buy_Quantity);
  console.log("Price on HomeController", Price);
  // console.log("Token available",token);

  // if (!userId) {
  //   alert("User ID not found. Please try again.");
  //   return;
  // }

  // let cart = localStorage.getItem('cart');

  // try {
  //   cart = cart ? JSON.parse(cart) : [];
  // } catch (e) {
  //   console.error('Error parsing cart data from local storage:', e);
  //   cart = [];
  // }

  // const existingProductIndex = cart.findIndex(item => item.P_Id === product.P_Id);

  // if (existingProductIndex !== -1) {
  //   cart[existingProductIndex].Buy_Quantity += 1;
  // } else {
  //   cart.push({ ...product, Buy_Quantity: 1, User_Id: userId });
  // }

  // localStorage.setItem('cart', JSON.stringify(cart));

  // If user is logged in, save the cart to the server
  
  
   if (token) {
    console.log("Token on HomeController", token);
      try {
        const response = await HomeModel.handleAddToCart( P_Id, Buy_Quantity ,Price);
        console.log("RESPONSE on HomeController", response);
      //  console.log("User_Id RESPONSE on HomeController", User_Id);
        console.log("P_Id RESPONSE on HomeController", P_Id);
        console.log("Buy_Quantity RESPONSE on HomeController", Buy_Quantity);
        console.log("Price RESPONSE on HomeController", Price);
        
      } catch (error) {
        console.error('Error storing cart data to database:', error);
        alert("An error occurred while storing cart data");
      }
    }
  };  

const HomeController = () => {
  const [LocationData, setUserLocation] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Eng');
  const [error, setError] = useState(null);
  
  
  const navigate = useNavigate();
  const isLogin = HomeModel.isLogin();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      fetchUserLocation(token);
       // Fetch categories on component mount
    } else {
      setError('Update location');
    }
  }, []);

  const fetchUserLocation = async (token) => {
    const userLocationModel = new UserLocationModel();
    try {
      const LocationData = await userLocationModel.fetchUserLocation(token);
      console.log("userLocationData on HomeController", LocationData);
      setUserLocation(LocationData); // Assuming only one location is returned
    } catch (error) {
      console.error('Error fetching user location:', error);
      setError('Cannot find user location');
    }
  };

  const handleLogout = () => {
    HomeModel.handleLogout();
    console.log('User logged out');
    navigate('/login');
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <HomeView
        LocationData={LocationData}
        isLogin={isLogin}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
        handleLogout={handleLogout}
        error={error}
        handleAddToCart={handleAddToCart} // Pass handleAddToCart as a prop
      />
    </div>
  );
};

export default HomeController;
