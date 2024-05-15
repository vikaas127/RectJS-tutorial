import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
    axios.get('http://localhost:3001/api/productlist',{ headers: { 'Content-Type': 'application/json' }}).then(response => {
    
    console.log(response, response.data);
    
    if (response && Array.isArray(response.data.data)) { // Ensure data.data is an array
      const productList = response.data.data.map(item => ({
        P_Id: item.P_Id,
        Cat_Id: item.Cat_Id,
        P_Name: item.P_Name,
        Desc: item.Desc,
        Quantity: item.Quantity,
        inStock: item.inStock,
        Price: item.Price,
        P_Thumbnail: item.P_Thumbnail
      }));
      
      console.log("Products before setting state:", products); // This will be empty on first render
          console.log("Product List from API:", productList);
          setProducts(productList);
          console.log("Products after setting state:", productList); // This should log the productList array
        } else {
          console.error("Response data is not an array:", response.data);
        }
   
    }).catch(error => {
      console.error('Error fetching product data:', error);
    });
  },[]);


  return (
 
    <div className="product-list">
      
<Header/>
      {Array.isArray(products) && products.length > 0 ? (
        products.map(product => (
          <div key={product.P_Id} className="product-item">
            <img src={product.P_Thumbnail} alt={product.P_Name} />
            <h3>{product.P_Name}</h3>
            <p>{product.Desc}</p>
            <p>Price: ₹{product.Price}</p>
            <p>Quantity: {product.Quantity}</p>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );

  /*
    return (
      <div className="home">
        <Header />
        <div className="product">
    {filteredProducts.map(products => (
      <div key={products.P_Id}>
        <img src={products.P_Thumbnail} alt={products.P_Name} />
        <h3>{products.P_Name}</h3>
        <p>{products.Desc}</p>
        <p>${products.Price}</p>
        <Link to={`/product/${products.P_Id}`}>View Details</Link>
      </div>
    ))}
  </div>
        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product">
            <img src="https://m.media-amazon.com/images/I/619lW2YtVhL._SL1200_.jpg" alt="Product 1" />
            <p>iQOO 12 5G</p>
            <p>Legend, 12GB RAM, 256GB Storage | 50MP + 50MP + 64MP Camera</p>
            <p>₹52,999</p>
            <Link to="http://localhost:3001/api/productlist">View Details</Link>
          </div>
          <div className="product">
            <img src="https://m.media-amazon.com/images/I/614wuq8aYSL._SL1467_.jpg" alt="Product 2" />
            <p>Reversible Anime Jacket</p>
            <p>Unisex Tokyo Revengers Reversible Anime Jacket for Men</p>
            <p>₹2,699</p>
            <Link to="http://localhost:3001/api/productlist">View Details</Link>
          </div>
          <div className="product">
            <img src="https://m.media-amazon.com/images/I/71Eo7Q7a6gL._SL1500_.jpg" alt="Product 3" />
            <p>Adidas Men's Performo M</p>
            <p>Running Shoe</p>
            <p>₹3,281</p>
            <Link to="http://localhost:3001/api/productlist">View Details</Link>
          </div>
          <div className="product">
            <img src="https://m.media-amazon.com/images/I/71HLp3PDqCL._SL1500_.jpg" alt="Product 4" />
            <p>Noise Mettalix</p>
            <p>1.4" Display, Bluetooth Calling Smart Watch with Metallic Strap, Stainless Steel Finish, Functional Crown, 7-Day Battery</p>
            <p>₹1,799</p>
            <Link to="http://localhost:3001/api/productlist">View Details</Link>
          </div>
        </section>
        <section className="popular-categories">
          <h2>Popular Categories</h2>
          <div className="Home Decor">
            <img src="https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/d/AmazonStores/A21TJRUUN4KGV/dbf6b77de7310f647fc8dc1ceead7dd6.w3000.h600._CR0%2C0%2C3000%2C600_SX1920_.jpg" alt="Home Decor" />
            <Link to="http://localhost:3001/api/productlist">View Products</Link>
          </div>
          <div className="Laptops">
            <img src="https://igotoffer.com/microsoft/wp-content/uploads/sites/2/2016/10/types-laptops-all.jpg" alt="Laptop" />
            <Link to="http://localhost:3001/api/productlist">View Products</Link>
          </div>
          <div className="Perfumes">
            <img src="https://i.pinimg.com/originals/6f/20/27/6f2027123cf85c3900c4618ba453a4eb.jpg" alt="Perfumes" />
            <Link to="http://localhost:3001/api/productlist">View Products</Link>
          </div>
          <div className="Fashion">
            <img src="https://www.mrporter.com/cms/ycm/resource/blob/1368520/3ac550f0aeed31e40402fe711ea33e27/image-data.jpg" alt="Fashion" />
            <Link to="http://localhost:3001/api/productlist">View Products</Link>
          </div>
          <div className="Gym Accessories">
            <img src="https://www.harrods.com/BWStaticContent/50000/49ea5463-9725-4d1d-8bb7-c78c80ef3afb_d-hero-stories-advertorial-technogym-april22-5.jpg" alt="Gym Accessories" />
            <Link to="http://localhost:3001/api/productlist">View Products</Link>
          </div>
          { Add more popular categories as needed }
        </section>
        <section className="latest-deals">
          <h2>Latest Deals</h2>
          <div className="deal">
            <img src="https://img.paisawapas.com/ovz3vew9pw/2017/08/09065815/Amazon-Todays-Deals.jpg" alt="Deal" />
            <p>Best Offer' for today</p>
            <Link to="/deal/deal-id">View Deal</Link>
          </div>
          { Add more latest deals as needed }
        </section>
      </div>
    );*/

}

export default Home;
