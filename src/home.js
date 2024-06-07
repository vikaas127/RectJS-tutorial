import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'; // Import the CSS file
import './CategoryList.css';
import CategoryList from './CategoryList';
import productListAPiCall from './API';
import { Link } from 'react-router-dom';
import Header from './Header'; // Import the Header component


 function Home() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1); // Default category ID
  const [userLocation, setUserLocation] = useState([])
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

  useEffect(() => {
    // Fetch user location data
    const token = sessionStorage.getItem('authToken');
    if (token) {
      fetchUserLocation(token);
    }
  }, []);

  const fetchUserLocation = async (token) => {
    try {
      const response = await axios.post('http://localhost:3001/api/Userlocation', {
        Token: token // sending email in the request body
      }, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });

      console.log('API response:', response.data); // Log the API response

      if (response.data && Array.isArray(response.data.data)) {
        const userDetails = response.data.data.map(item => ({
          Name: item.Name,
          City: item.City,
          Pincode: item.Pincode
        }));
        setUserLocation(userDetails); // Update user location data in state
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };

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
  
return (
  <div className="product-list">
    <Header userLocation={userLocation} />
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

