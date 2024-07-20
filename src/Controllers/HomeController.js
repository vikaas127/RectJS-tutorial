import React, { useState, useEffect } from 'react';
import { HomeModel } from '../Action/Home';
import HeaderView from '../Views/HeaderView';
import UserLocationModel from '../Action/UserLocation';

export const handleAddToCart = async ( User_Id, P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail ) => {
  const token = sessionStorage.getItem('authToken');  
  const isLogin = sessionStorage.getItem('isLogin') === 'True';

  console.log("User_Id on HomeController", User_Id);
  console.log("P_Id on HomeController", P_Id);
  console.log("Buy_Quantity on HomeController", Buy_Quantity);
  console.log("Price on HomeController", Price);  

  if (isLogin && token) {
    try {
      await HomeModel.handleAddToCart(User_Id, P_Id, Buy_Quantity, Price);
    } catch (error) {
      console.error('Error storing cart data to database:', error);
      alert("An error occurred while storing cart data");
    }
  } else {
    // Logic for handling cart when not logged in
    const cartItem = { User_Id, P_Id, P_Name, Desc, Buy_Quantity, Price, P_Thumbnail };
    try {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert("Product added to local cart");
    } catch (error) {
      console.error('Error parsing or updating localStorage cart data:', error);
      alert("An error occurred while updating cart data");
    }
  }
};

const HomeController = () => {
  const [LocationData, setUserLocationData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Eng');
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState([]);
  const userLocationModel = new UserLocationModel();
  
  const token = sessionStorage.getItem('authToken');
    console.log("Token on HomeController", token);
    const isLogin = sessionStorage.getItem('isLogin');
    console.log("isLogin on HomeController", isLogin)

    useEffect(() => {
      if (isLogin && token) {
        console.log("before fetchUserLocation function call");
        fetchUserLocation(token);
      } else {
        // Load cart data from localStorage when not logged in
        try {
          const cart = localStorage.getItem('cart');
          setCartData(cart ? JSON.parse(cart) : []);
        } catch (error) {
          console.error('Error parsing localStorage cart data:', error);
          setCartData([]);
        }
      }
    }, [isLogin, token]);
    

const fetchUserLocation = async (token) => {
  console.log("under fetchUserLocation on HomeController");
  
  try {
      const LocationData = await userLocationModel.fetchUserLocation(token);
      console.log("userLocationData from UserLocationController",LocationData);
      setUserLocationData(LocationData);
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
        cartData = {cartData}
      />
    </div>
  );
};

export default HomeController;
