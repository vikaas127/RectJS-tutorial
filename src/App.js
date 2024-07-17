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
      }
    };

    handleCartClick();
}, [User_Id]);

const updateQuantity = async ( productId, newQuantity) => {
  console.log("productId in updateQuantity on App",productId);
  console.log("newQuantity in updateQuantity on App",newQuantity);
  try{
    const updateProducts = await CartItemModel.updateCartProduct (User_Id, productId, newQuantity);
    console.log("updateQuantity is working", updateProducts);
    setUpdateProducts(updateProducts => 
      updateProducts.map(product =>
        product.P_Id === productId ? { ...product, Buy_Quantity: newQuantity } : product
      )
    );
  } catch (error) {
    console.error("Error updating product quantity:", error);
  }
};

const removeItem = async (productId) => {
  try{
    const removeProduct = await CartItemModel.removeCartProduct (productId);
    console.log("removeProduct is working", removeProduct);
    setremoveProduct(removeProduct => 
      removeProduct.filter(product => product.P_Id !== productId)
    );
  } catch (error) {
    console.error("Error updating product quantity:", error);
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
  };

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/home" element={<>
          <HeaderView User_Id = {User_Id} handleSearch={handleSearch}/>
          <CategoryController />
          <ProductController searchTerm={searchTerm} User_Id={User_Id} />
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