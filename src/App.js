import './App.css';
import './Signup.css';
import './login.css';
import './CSS/home.css'; 
import './CategoryList.css';
import './ProductDetails.css';
import './Header.css';
import './CSS/cart.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderView from './Views/HeaderView';
import { HomeModel } from './Action/Home';
import SignUpView from './Views/SignUpView';
import CartModel from '../src/Action/Cart';
import CartItemModel from './Action/CartItem';
import LoginController from './Controllers/LoginController';
import CartIView from './Views/CartView';
import ProductDetailsView from './Views/ProductDetailsView';
import HomeController from './Controllers/HomeController';
import AccountDetailsController from './Controllers/AccountDetailsController';
import CategoryController from './Controllers/CategoryController';
import ProductController from './Controllers/ProductController';

const App = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [updateProducts, setUpdateProducts] = useState([]);
  const [removeProduct, setremoveProduct] = useState ([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const User_Id = sessionStorage.getItem("User_Id")

  useEffect(() => {
    const handleCartClick = async () => {
      if(User_Id){  
        console.log("User_Id on App in handleCartClick", User_Id);
      try {
            const cartProduts = await CartModel.fetchCartProducts(User_Id);
            console.log("cartProduts from App:", cartProduts);
            setCartProducts(cartProduts);
        } catch (error) {
            console.error('Error setting product list:', error);
        }
      } else {
        // Retrieve cart data from localStorage if User_Id is not available
        const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("cart data from localStorage", localStorageCart);
        setCartProducts(localStorageCart);
      }
    }; 

    handleCartClick();
}, [User_Id]);

const updateQuantity = (productId, newQuantity) => {
  if (User_Id) {
    CartItemModel.updateCartProduct(User_Id, productId, newQuantity)
      .then(() => {
        setCartProducts(prevProducts =>
          prevProducts.map(product =>
            product.P_Id === productId
              ? { ...product, Buy_Quantity: newQuantity, Total_Price: newQuantity * product.Price }
              : product
          )
        );
      })
      .catch(error => {
        console.error('Error updating product quantity:', error);
      });
  } else {
    setCartProducts(prevProducts =>
      prevProducts.map(product =>
        product.P_Id === productId
          ? { ...product, Buy_Quantity: newQuantity, Total_Price: newQuantity * product.Price }
          : product
      )
    );
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }
};

const removeItem = (productId) => {
  if (User_Id) {
    CartItemModel.removeCartProduct(productId)
      .then(() => {
        setCartProducts(prevProducts => prevProducts.filter(product => product.P_Id !== productId));
      })
      .catch(error => {
        console.error('Error removing product:', error);
      });
  } else {
    setCartProducts(prevProducts => prevProducts.filter(product => product.P_Id !== productId));
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }
};

  const setTotalPrice = (productId, newTotalPrice) => {
    setCartProducts(prevProducts => 
      prevProducts.map(product =>
        product.P_Id === productId ? { ...product, Total_Price: newTotalPrice } : product
      )
    );
  };

  const handleAddToCart = async(User_Id, productId, Buy_Quantity, price) => {
    try {
      const products = await HomeModel.handleAddToCart(User_Id, productId, Buy_Quantity, price);
      console.log("productList on ProductController",products)
      setProducts(products);
  } catch (error) {
      console.error('Error setting product list:', error);
  }
    console.log(`User ${User_Id} added product ${productId} with quantity ${Buy_Quantity} and price ${price} to the cart.`);
  };

  const handleLogout =()=> {
    console.log("inside handleLogout function");
    HomeModel.handleLogout();
    console.log('User logged out');
  };
  
  const handleSearch = (searchTerm) => {
    console.log("Setting searchTerm on App", searchTerm);
    setSearchTerm(searchTerm);
    setSelectedCategory(null); // Clear category when search term is set
  };

  const handleCategory= (category) => {
    console.log("handleCategoryClick working",category);
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search term when category is set
  };

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/home" element={<>
          <HeaderView User_Id = {User_Id} handleSearch={handleSearch}/>
          <CategoryController handleCategory={handleCategory} />
          <ProductController User_Id={User_Id} searchTerm={searchTerm} category={selectedCategory} />
        </>} />
          <Route path="/cart" element={
          <CartIView 
              cartProducts={cartProducts} 
              setTotalPrice={setTotalPrice}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          } />
          <Route path="/login" element={<LoginController />} />
          <Route path="/" element={<HomeController />} />
          <Route path="/Signup" element={<SignUpView />} />  
          <Route path="/Account" element={<AccountDetailsController />} />           
          <Route path="/product-details" element={<ProductDetailsView User_Id = {User_Id} handleAddToCart={handleAddToCart}/>} />
        </Routes> 
        
      </div>     
    </Router>  
  );
};

export default App;