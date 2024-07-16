import React, { useState } from 'react';
import { HomeModel } from '../Action/Home';
import HeaderView from '../Views/HeaderView';
import UserLocationModel from '../Action/UserLocation';

export const handleAddToCart = async ( User_Id, P_Id, Buy_Quantity ,Price) => {
  // const User_Id = sessionStorage.getItem("User_Id");
  const token = sessionStorage.getItem('authToken');      
  console.log("User_Id on HomeController", User_Id);
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
        const response = await HomeModel.handleAddToCart(User_Id, P_Id, Buy_Quantity ,Price);
        console.log("RESPONSE on HomeController", response);
        console.log("User_Id RESPONSE on HomeController", User_Id);
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
  const [LocationData, setUserLocationData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Eng');
  const [error, setError] = useState(null);
  const userLocationModel = new UserLocationModel();
  
  const token = sessionStorage.getItem('authToken');
    console.log("Token on HomeController", token);
    const isLogin = sessionStorage.getItem('isLogin');
    console.log("isLogin on HomeController", isLogin)

    if (isLogin === 'True' && token) {
      console.log("before fetchUserLocation function call")
        fetchUserLocation(token);
    } else {
        setError('Update location');
    }

const fetchUserLocation = async (token) => {
  console.log("under fetchUserLocation on HomeController");
  
  try {
      const LocationData = await userLocationModel.fetchUserLocation(token);
      console.log("userLocationData from UserLocationController",LocationData);
      setUserLocationData(LocationData);
      // onUpdateUserLocation(LocationData);
  } catch (error) {
      console.error("Error fetching user location:", error);
      setError('Cannot find user location');
  }
};

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
 
  return (
    <div>
      <HeaderView
        LocationData={LocationData}
        selectedLanguage= "Eng"      /*{selectedLanguage}*/
        handleLanguageChange={handleLanguageChange}
        isLogin={isLogin}
        error={error}
        handleAddToCart={handleAddToCart} // Pass handleAddToCart as a prop
      />
    </div>
  );
};

export default HomeController;
