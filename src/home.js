import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'; // Import the CSS file
import './CategoryList.css';
import CategoryList from './CategoryList';
import productListAPiCall from './API';
import { Link } from 'react-router-dom';
import Userlocation from './Location'


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
<div class="header">
  <div class="container">
    <div class="logo">
      <img src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png" alt="Amazon Logo"/>
    </div>
    <div class="delivery">
    <p>Delivering to <span id="location"><Userlocation /></span></p>
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
          <span class="greeting">Hello, Akshay</span>
          <p>Account & Lists</p>
          </div>
            
    <div class="account-options">
      <a href="#">Returns & orders</a>
      <a href="/Cart">Cart</a>
      <a href="/login">Sign Out</a>
    </div>
  </div>
</div>

  );
}

function Home() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1); // Default category ID
  const navigate = useNavigate(); // Use useNavigate hook
  
  useEffect(() => {
    // Fetch product data from API
    productListAPiCall(selectedCategory)
    .then(response => {
      console.log("API response",response)
      setProducts(response); // Use setProducts from home.js
    })
     .catch(error => {
      console.error('Error fetching product list:', error);
    });
  },[selectedCategory]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product details page
  };
    


  // Function to handle adding to cart
async function handleAddToCart(user_id, product_id, buy_quantity, price) {

  try {
    const response = await axios.post('http://localhost:3001/api/Add_productcart',{
      User_Id: user_id,
      P_Id: product_id,
      Buy_Quantity: buy_quantity,
      Price: price
    }, { headers: { 'Content-Type': 'application/json' } }
  
  
  );
    console.log(response.data.message); // Log success message
    alert("Product added to cart successfully");
    
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response:', error.response);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error request:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error message:', error.message);
    }
    // Optionally, update the UI to show error feedback to the user
  }
}
  
/*return (
 
<div className="product-list">
<Header/>
<CategoryList onSelectCategory={handleCategorySelect}/>
<div className="product-grid">

{Array.isArray(products) && products.length > 0 ? (
        products.map(product => (
            <div key={product.P_Id} className="product-item" onClick={() => handleProductClick(product.P_Id)}>
          /*  <img src={product.P_Thumbnail} alt={product.P_Name} />
            <h3 className="name">{product.P_Name}</h3>
            <p className="description">{product.Desc}</p>
            <p className='price'>Price: ₹{product.Price}</p>
            <p>inStock:
              <span className={product.inStock ? "available" : "unavailable"}>
              {product.inStock ? "Available" : "Unavailable"}
              </span>
            </p> 
            <button onClick={() => handleAddToCart(2, product.P_Id, 2, product.Price,)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  </div>
  ); 
}

export default Home; */

return (
  <div className="product-list">
    <Header />
    <CategoryList onSelectCategory={handleCategorySelect} />
    <div className="product-grid">
      {Array.isArray(products) && products.length > 0 ? (
        products.map(product => (
          <div key={product.P_Id} className="product-item" >
            <Link to={`/product/${product.P_Id}`} state={{ product }}> 
              <img src={product.P_Thumbnail} alt={product.P_Name} />
              </Link>
              <h3 className="name">{product.P_Name}</h3>
              <p className="description">{product.Desc}</p>
              <p className='price'>Price: ₹{product.Price}</p>
              <p>inStock:
                <span className={product.inStock ? "available" : "unavailable"}>
                  {product.inStock ? "Available" : "Unavailable"}
                </span>
              </p>
            <button onClick={() => handleAddToCart(2, product.P_Id, 2, product.Price)}>Add to Cart</button>
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
