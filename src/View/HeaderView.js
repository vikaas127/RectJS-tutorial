import React, {useState, useEffect} from 'react';
import CartModel from '../Actions/Cart';
import { UserAccountDetails } from '../Actions/AccountDetails';

const HeaderView = ({
  LocationData,
  isLogin,
  selectedLanguage,
  handleLanguageChange,
  handleLogout,
  // Receive categories from HomeController
}) => {
  const [username, setUsername] = useState('User');

  // console.log("LocationData",LocationData);

  // const { Name = ' ', City = '', Pincode = '' } = LocationData || {};
  // const locationDisplay = LocationData ? `${City}, ${Pincode}` : 'Update Location';
  // const username = LocationData ? `${Name}` : 'User';

  // console.log("locationDisplay",locationDisplay);
  // console.log("username",username);

  useEffect(() => {
    const handleUserAccount = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        console.error("User is not logged in");
        return;
      }

      try {
        const accountDetails = await UserAccountDetails(token);
        if (accountDetails.length > 0) {
          setUsername(accountDetails[0].Name);
          console.log("User from HeaderView", accountDetails[0].Name);
        }
      } catch (error) {
        console.error('Error fetching user account details', error);
        alert('Error fetching user account details');
      }
    };

    if (isLogin) {
      handleUserAccount();
    }
  }, [isLogin]);

  
  const handleCartClick = async() => {
    try{
   const userId= 2; // Assuming the user ID is 2, you can replace this with the actual user ID
    const cartproducts = await CartModel.fetchCartProducts(userId);
    console.log("cartproducts on header view",cartproducts);
  }
  catch (error) {
    console.error("Error fetching cart products");
  }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <img src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png" alt="Amazon Logo" />
        </div>
        <div className="delivery">
          <p>Delivering to</p>
          <span id="location">
            {isLogin ? LocationData : 'Update location'}
          </span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="button" onClick={() => console.log('Search clicked')}>Search</button>
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
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderView;
