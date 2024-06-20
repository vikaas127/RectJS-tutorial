// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './home.css'; // Import the CSS file
// import './CategoryList.css';
// import CategoryList from './CategoryList';
// import productListAPiCall from './API';
// import { Link } from 'react-router-dom';
// import Header from './Header'; // Import the Header component


//  function Home() {

//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(1); 
//   const [userLocation, setUserLocation] = useState([])
//   const [userId, setUserId] = useState(null); 
//   const navigate = useNavigate(); 
  
//   useEffect(() => {
//     // Fetch product data from API
//     productListAPiCall(selectedCategory)
//     .then(response => {
//       console.log("API response",response)
//       setProducts(response); // Use setProducts from home.js
//     })
//      .catch(error => {
//       console.error('Error fetching product list:', error);
//     });
//   },[selectedCategory]);

//   useEffect(() => {
//     // Fetch user location data
//     const token = sessionStorage.getItem('authToken');
//     if (token) {
//       fetchUserLocation(token);
//     }
//   }, []);

//   const fetchUserLocation = async (token) => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/Userlocation', {
//         Token: token // sending email in the request body
//       }, {
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
//       });

//       console.log('API response:', response.data); // Log the API response

//       if (response.data && Array.isArray(response.data.data)) {
//         const userDetails = response.data.data.map(item => ({
//           Name: item.Name,
//           City: item.City,
//           Pincode: item.Pincode
//         }));
//         setUserLocation(userDetails); // Update user location data in state
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       console.error("Error fetching user location:", error);
//     }
//   };

//   const handleCategorySelect = (catId) => {
//     setSelectedCategory(catId);
//   };

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`); // Navigate to product details page
//   };

//   const handleAddToCart = async (product) => {
//     if (!userId) {
//       alert("User ID not found. Please try again.");
//       return;
//     }

//     let cart = localStorage.getItem('cart');
  
//       if(islogin){
//         try {
//           const response = await fetch('http://localhost:3001/api/create_productcart', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(cart),
//           });
    
      
//           if (response.ok) {
//             console.log("Response", response);
//             alert("Product added to cart and stored successfully");
//           } else {
//             alert("Failed to store cart data");
//             console.error('Failed to store cart data:', response.statusText);
//           }
//         } catch (error) {
//           console.error('Error storing cart data to database:', error);
//           alert("An error occurred while storing cart data");
//         }
      

//       }else{

//         try {

//       cart = cart ? JSON.parse(cart) : [];
//     } catch (e) {
//       console.error('Error parsing cart data from local storage:', e);
//       cart = [];
//     }
  
//     const existingProductIndex = cart.findIndex(item => item.P_Id === product.P_Id);
  
//     if (existingProductIndex !== -1) {
//       cart[existingProductIndex].Buy_Quantity += 1;
//     } else {
//       cart.push({ ...product, Buy_Quantity: 1, User_Id: userId });
//     }
  
//     localStorage.setItem('cart', JSON.stringify(cart));
//       }
//   };
  

// return (
//   <div className="product-list">
//     <Header userLocation={userLocation} />
//     <CategoryList onSelectCategory={handleCategorySelect} />
//     <div className="product-grid">
//       {Array.isArray(products) && products.length > 0 ? (
//         products.map(product => (
//           <div key={product.P_Id} className="product-item" >
//             <Link to={`/product/${product.P_Id}`} state={{ product }}> 
//               <img src={product.P_Thumbnail} alt={product.P_Name} />
//               </Link>
//               <h3 className="name">{product.P_Name}</h3>
//               <p className="description">{product.Desc}</p>
//               <p className='price'>Price: ₹{product.Price}</p>
//               <p>inStock:
//                 <span className={product.inStock ? "available" : "unavailable"}>
//                   {product.inStock ? "Available" : "Unavailable"}
//                 </span>
//               </p>
//             <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//           </div>
//         ))
//       ) : (
//         <p>No products available</p>
//       )}
//     </div>
//   </div>
// );
// }

// export default Home; 

