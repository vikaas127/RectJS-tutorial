import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Import the CSS file
import './CategoryList.css';

function Header({ userLocation }) {
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem('isLogin') === 'True';

  // Define language options
  const languageOptions = [
    { code: 'Eng', label: 'English' },
    { code: 'Fre', label: 'French' },
    { code: 'Spa', label: 'Spanish' },
    { code: 'Hin', label: 'Hindi' },
    { code: 'Mar', label: 'Marathi' },
    { code: 'Guj', label: 'Gujarati' },
    { code: 'Tel', label: 'Telugu' },
    { code: 'Tam', label: 'Tamil' },
    { code: 'Kan', label: 'Kannada' },
    // Add more languages as needed
  ];

  // State to manage selected language
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].code);

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.setItem('isLogin', 'False');
    console.log('User logged out');
    navigate('/login');
  }

  // Function to handle language selection
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    // You can add additional logic here, such as updating language settings in your application
  };

  const userName = userLocation.length > 0 ? userLocation[0].Name.split(' ')[0]  : 'User';
  const userCity = userLocation.length > 0 ? userLocation[0].City : '';
  const userPincode = userLocation.length > 0 ? userLocation[0].Pincode : '';
  
  return (
<div class="header">
  <div class="container">
    <div class="logo">
      <img src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png" alt="Amazon Logo"/>
    </div>
    <div className="delivery">
          <p>Delivering to</p>
          <span id="location">
            {isLogin ? `${userCity}, ${userPincode}` : 'Update location'}
          </span>
        </div>
    <div class="search-bar">
      <input type="text" placeholder="Search..." />
      <button variant="contained" color="primary">Search</button>
    </div>
    <nav class="navigation">
      <ul>
        <li>
          <select>
            <option value="en">English</option>
            <option value="es">Hindi</option>
            <option value="es">Marathi</option>
            <option value="es">Gujarati</option>
            <option value="es">Telugu</option>
            <option value="es">Tamil</option>
            <option value="es">Kannada</option>
          </select>
        </li>
        </ul>
        </nav>
        <div class="account-lists">
          <span class="greeting">Hello, {isLogin ? userName : 'User'} </span>
          <a href="/account">Account & Lists</a>
          </div> 
          <div className="account-options">
          <a href="#">Returns & orders</a>
          <a href="/Cart">Cart</a>
          {isLogin ? (
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
  </div>
</div>
);
}

export default Header;