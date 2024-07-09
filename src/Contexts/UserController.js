// // src/controllers/UserController.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserModel from '../Context(Model)/UserModel';
// import HeaderView from '../View/HeaderView';

// const UserController = () => {
//   const navigate = useNavigate();
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState('Eng');
//   const [error, setError] = useState(null);
//   const isLogin = UserModel.isLogin();

//   useEffect(() => {
//     const token = sessionStorage.getItem('authToken');
//     if (token) {
//       fetchUserLocation(token);
//     } else {
//       setError('Update location');
//     }
//   }, []);

//   const fetchUserLocation = async (token) => {
//     try {
//       const userDetails = await UserModel.fetchUserLocation(token);
//       setUserLocation(userDetails[0]); // Assuming only one location is returned
//     } catch (error) {
//       console.error('Error fetching user location:', error);
//       setError('Cannot find user location');
//     }
//   };

//   const handleLogout = () => {
//     UserModel.handleLogout();
//     console.log('User logged out');
//     navigate('/login');
//   };

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };

//   return (
//     <HeaderView
//       userLocation={userLocation}
//       isLogin={isLogin}
//       selectedLanguage={selectedLanguage}
//       handleLanguageChange={handleLanguageChange}
//       handleLogout={handleLogout}
//       error={error}
//     />
//   );
// };

// export default UserController;
