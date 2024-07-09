import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeModel } from '../Actions/HomeModel';
import HomeView from '../View/HomeView'; // Import HomeView
import UserLocationModel from '../Actions/UserLocationModel';
import ProductView from '../View/ProductView';
 // Import CategoryModel

const HomeController = () => {
  const [userLocationData, setUserLocation] = useState(null);
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
    try {
      const userLocationData = await UserLocationModel.fetchUserLocation(token);
      console.log("userLocationData on HomeController", userLocationData);
      setUserLocation(userLocationData); // Assuming only one location is returned
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

  const handleAddToCart = async (product, userId, token) => {
    if (!userId) {
      alert("User ID not found. Please try again.");
      return;
    }

    let cart = localStorage.getItem('cart');

    try {
      cart = cart ? JSON.parse(cart) : [];
    } catch (e) {
      console.error('Error parsing cart data from local storage:', e);
      cart = [];
    }

    const existingProductIndex = cart.findIndex(item => item.P_Id === product.P_Id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].Buy_Quantity += 1;
    } else {
      cart.push({ ...product, Buy_Quantity: 1, User_Id: userId });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // If user is logged in, save the cart to the server
    if (token) {
      try {
        const response = await HomeModel.handleAddToCart(product);
        if (response.ok) {
          alert("Product added to cart and stored successfully");
        } else {
          alert("Failed to store cart data");
          console.error('Failed to store cart data:', response.statusText);
        }
      } catch (error) {
        console.error('Error storing cart data to database:', error);
        alert("An error occurred while storing cart data");
      }
    }
  };

  

  return (
    <div>
      {/* <HeaderView
        userLocation={userLocation}
        isLogin={isLogin}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
        handleLogout={handleLogout}
        error={error}
      /> */}
      <HomeView
        userLocationData={userLocationData}
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
