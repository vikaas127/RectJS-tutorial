import React from 'react';


const HeaderView = ({
  LocationData,
  isLogin,
  selectedLanguage,
  handleLanguageChange,
  handleLogout,
  // Receive categories from HomeController
}) => {
  // const { Name = ' ', City = '', Pincode = '' } = LocationData || {};
  // const locationDisplay = LocationData ? `${City}, ${Pincode}` : 'Update Location';
  // const username = LocationData ? `${Name}` : 'User';

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
          <span className="greeting">Hello, {isLogin ? LocationData : 'User'}</span>
          <a href="/account">Account & Lists</a>
        </div>
        <div className="account-options">
          <a href="#">Returns & Orders</a>
          <a href="/Cart">Cart</a>
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
