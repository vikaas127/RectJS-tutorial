import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeModel } from '../Action/Home';
import CartModel from '../Action/Cart';
import {UserAccountDetails} from '../Action/AccountDetails';
import UserLocationModel from '../Action/UserLocation';

const HeaderView = ({
  selectedLanguage,
  handleLanguageChange,
  handleSearch,
}) => {
  const [username, setUsername] = useState('User');
  const [error, setError] = useState(null);
  const [LocationData, setLocationData] = useState(null);
  const [Login, setLogin] = useState(sessionStorage.getItem('isLogin') === 'true');
  const [searchTerm, setSearchTerm] = useState();
  

  const userLocationModel = new UserLocationModel();
  const isLogin = sessionStorage.getItem('isLogin');
  const token = sessionStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserAccount = async () => {
      
      console.log("token under handleUserAccount",token);
      if (!token) {
        console.error("User is not logged in");
        return;
      }

      try {
        const accountDetails = await UserAccountDetails(token);
        if (accountDetails.length > 0) {
          const fullName = accountDetails[0].Name;
          const firstName = fullName.split(' ')[0]; 
          setUsername(firstName);
          console.log("User from HeaderView", accountDetails[0].Name);
        }
      } catch (error) {
        console.error('Error fetching user account details', error);
        alert('Error fetching user account details');
      }
    };
    
    const fetchUserLocation = async () => {
      console.log("under fetchUserLocation on HeaderView",token);
      try {
          const LocationData = await userLocationModel.fetchUserLocation(token);
          
          setLocationData(LocationData);
      } catch (error) {
          console.error("Error fetching user location:", error);
          setError('Cannot find user location');
      }
    };

    if (isLogin) {
      console.log("isLogin on HeaderView line 76", isLogin);
      handleUserAccount();
      fetchUserLocation();
    }
  }, [isLogin]);

  const handleCartClick = async(User_Id) => {
    console.log("User_Id handleCartClick on HeaderView",User_Id);
    try{
    const cartproducts = await CartModel.fetchCartProducts(User_Id);
    console.log("cartproducts on header view",cartproducts);
  }
  catch (error) {
    console.error("Error fetching cart products");
  }
  };

// When LocationData is an array with an object inside
const locationObject = LocationData && LocationData.length > 0 ? LocationData[0] : null;

// Extract city and pincode from locationObject
const city = locationObject ? locationObject.City : '';
console.log("city",city);
const pincode = locationObject ? locationObject.Pincode : '';
console.log("pincode",pincode);

    const handleLogout =()=> {
    HomeModel.handleLogout();
    console.log('User logged out');
    setLogin(false);
    navigate('/login');
  };

  const handleSearchClick = () => {
    console.log("Search term before triggering handleSearch:", searchTerm);
    if(handleSearch){
      console.log("Search term after triggering handleSearch:", searchTerm);
      handleSearch(searchTerm);
      setSearchTerm(''); // Clear the search term after search is triggered
    } else {
      console.log("handleSearch function is not defined");
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
        <a href="/home">
          <img src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png" alt="Amazon Logo" />
          </a>
        </div>
        <div className="delivery">
          <p>Delivering to</p>
          <span id="location">
          {isLogin ? `${city}, ${pincode}` : 'Update location'}
          </span>
        </div>
        <div className="search-bar">
          <input type="text" 
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
          <button type="button" onClick={handleSearchClick}>Search</button>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="Eng">English</option>
                <option value="Hin">Hindi</option>
                <option value="Mar">Marathi</option>
                <option value="Guj">Gujarati</option>
                <option value="Tel">Telugu</option>
                <option value="Tam">Tamil</option>
                <option value="Kan">Kannada</option>
              </select>
            </li>
          </ul>
        </nav>
      
        <div className="account-lists">
          <span className="greeting">Hello, {isLogin ? username : 'User'}</span>
          <a href="/account">Account & Lists</a>
        </div>
        <div className="account-options">
          <a href="#">Returns & Orders</a>
          <a href="/Cart" onClick={handleCartClick}>Cart</a>
          {isLogin ? (
            <a onClick={() => {console.log("Logout clicked"); handleLogout();}} style={{ cursor: 'pointer' }}>Logout</a>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderView;
