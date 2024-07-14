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
import HomeView from './Views/HomeView'; 
import SignUpView from './Views/SignUpView';
import CartModel from '../src/Action/Cart';
import CartItemModel from './Action/CartItem';
import LoginController from './Controllers/LoginController';
import CartIView from './Views/CartView';
import ProductDetailsView from './Views/ProductDetailsView';
import HomeController from './Controllers/HomeController';
import AccountDetailsController from './Controllers/AccountDetailsController';

const App = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [updateProducts, setUpdateProducts] = useState([]);
  const [removeProduct, setremoveProduct] = useState ([]);
  //   { P_Id: 1, P_Thumbnail: 'thumb1.jpg', P_Name: 'Product 1', Price: 100, Buy_Quantity: 2, Total_Price: 200 },
  //   // Add more products here
  
  useEffect(() => {
    const User_Id =2;
    const handleCartClick = async (User_Id) => {
        try {
            const cartProduts = await CartModel.fetchCartProducts(User_Id);
            console.log("cartProduts from App:", cartProduts);
            setCartProducts(cartProduts);
        } catch (error) {
            console.error('Error setting product list:', error);
        }
    };
    handleCartClick();
}, []);

const updateQuantity = async ( productId, newQuantity) => {
  try{
    const updateProducts = await CartItemModel.updateCartProduct ( productId, newQuantity);
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

  const handleAddToCart = (userId, productId, quantity, price) => {
    // Implement the logic to add product to cart
    console.log(`User ${userId} added product ${productId} with quantity ${quantity} and price ${price} to the cart.`);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<HomeView /> } />
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
          <Route path="/product-details" element={<ProductDetailsView handleAddToCart={handleAddToCart}/>} />
        </Routes>  
      </div>     
    </Router>  
  );
};

export default App;
