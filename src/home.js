import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

function Home() {
  return (
    <div className="home">
      <header>
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Find everything you need at great prices!</p>
      </header>
      <section className="featured-products">
        <h2>Featured Products</h2>
        {/* Render featured products here */}
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
