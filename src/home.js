import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css'; // Import the CSS file
import './CategoryList.css';
import CategoryList from './CategoryList';
import productListAPiCall from './API';
import ProductList from './ProductList';

function Header() {

  // Define language options
  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'es', label: 'Spanish' },
    // Add more languages as needed
  ];

  // State to manage selected language
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].code);

  // Function to handle language selection
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    // You can add additional logic here, such as updating language settings in your application
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png" alt="Amazon Logo" height="10" width="80" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button variant="contained" color="primary">Search</button>
        </div>
        <nav className="navigation">
          <ul>
            <li><select value={selectedLanguage} onChange={handleLanguageChange}>
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.label}</option>
              ))}
            </select>
            </li>
            <li><a href="#">Account & lists</a></li>
            <li><a href="#">Returns & orders</a></li>
          </ul>
        </nav>
        <div className="account-options">
          <a href="#">Sign In</a>
          <a href="#">Cart</a>
        </div>
      </div>
    </header>
  );
}

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from API
    productListAPiCall(1)
    .then(response => {
      console.log("API response",response)
      setProducts(response); // Use setProducts from home.js
    })
     .catch(error => {
      console.error('Error fetching product list:', error);
    });
  },[]);

  function handleAddToCart(product) {
    // Add your logic to handle adding the product to the cart
    // This might include updating state, making an API call, etc.
    console.log(`Product added to cart: ${product.P_Name}`);
  }
  
  return (
 
  <div className="product-list">
      
<Header/>
<CategoryList/>
<div className="product-grid">

{Array.isArray(products) && products.length > 0 ? (
        products.map(product => (

          <div key={product.P_Id} className="product-item">
            <img src={product.P_Thumbnail} alt={product.P_Name} />
            <h3 className="name">{product.P_Name}</h3>
            <p className="description">{product.Desc}</p>
            <p className='price'>Price: ₹{product.Price}</p>
            <p>inStock:
              <span className={product.inStock ? "available" : "unavailable"}>
              {product.inStock ? "Available" : "Unavailable"}
              </span>
            </p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  </div>
  ); 
}

export default Home;
