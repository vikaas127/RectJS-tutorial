import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import the CSS file

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
          <input type="text" placeholder="Search..."/>
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
          <a href="#">Account & Lists</a>
          <a href="#">Orders</a>
          <a href="#">Cart</a>
        </div>
      </div>
    </header>
  );
}

function Home() {
  return (
    <div className="home">
      <Header />
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product">
          <img src="product-image-url" alt="Product" />
          <h3>Product Name</h3>
          <p>Product Description</p>
          <p>$Product Price</p>
          <Link to="/product/product-id">View Details</Link>
        </div>
        {/* Add more featured products as needed */}
      </section>
      <section className="popular-categories">
        <h2>Popular Categories</h2>
        <div className="category">
          <img src="category-image-url" alt="Category" />
          <h3>Category Name</h3>
          <Link to="/products/category-id">View Products</Link>
        </div>
        {/* Add more popular categories as needed */}
      </section>
      <section className="latest-deals">
        <h2>Latest Deals</h2>
        <div className="deal">
          <img src="deal-image-url" alt="Deal" />
          <h3>Deal Name</h3>
          <p>Deal Description</p>
          <p>$Deal Price</p>
          <Link to="/deal/deal-id">View Deal</Link>
        </div>
        {/* Add more latest deals as needed */}
      </section>
    </div>
  );
}

export default Home;
