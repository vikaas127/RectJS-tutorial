import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CategoryListView from '../View/CategoryListView';
import HomeController  from '../Controller/HomeController';
import CategoryController from '../Controller/CategoryController';

const HomeView = ({
  userLocation,
  isLogin,
  selectedLanguage,
  handleLanguageChange,
  handleLogout,
  error
}) => {

  const controller = new HomeController({ });

  


  const categoryController = new CategoryController({});

  

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    const token = sessionStorage.getItem('authToken');
    controller.addToCart(product, userId, token);
    console.log("Clicked on Add to Cart", product);
  };

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
  ];

  const userName = userLocation ? userLocation.Name.split(' ')[0] : 'User';
  const userCity = userLocation ? userLocation.City : '';
  const userPincode = userLocation ? userLocation.Pincode : '';

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="logo">
            <img src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png" alt="Amazon Logo" />
          </div>
          <div className="delivery">
            <p>Delivering to</p>
            <span id="location">
              {isLogin ? `${userCity}, ${userPincode}` : 'Update location'}
            </span>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button variant="contained" color="primary">Search</button>
          </div>
          <nav className="navigation">
            <ul>
              <li>
                <select value={selectedLanguage} onChange={handleLanguageChange}>
                  {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.label}</option>
                  ))}
                </select>
              </li>
            </ul>
          </nav>
          <div className="account-lists">
            <span className="greeting">Hello, {isLogin ? userName : 'User'}</span>
            <a href="/account">Account & Lists</a>
          </div>
          <div className="account-options">
            <a href="#">Returns & Orders</a>
            <a href="/Cart">Cart</a>
            {isLogin ? (
              <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
            ) : (
              <a href="/login">Login</a>
            )}
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
<div>

<CategoryListView onSelectCategory={handleCategorySelect} />
</div>
      <div className="product-list">
       
        <div className="product-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map(product => (
              <div key={product.P_Id} className="product-item">
                <Link to={`/product/${product.P_Id}`} state={{ product }}>
                  <img src={product.P_Thumbnail} alt={product.P_Name} />
                </Link>
                <h3 className="name">{product.P_Name}</h3>
                <p className="description">{product.Desc}</p>
                <p className="price">Price: ₹{product.Price}</p>
                <p>
                  inStock:
                  <span className={product.inStock ? "available" : "unavailable"}>
                    {product.inStock ? "Available" : "Unavailable"}
                  </span>
                </p>
                <button className='cart-btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
