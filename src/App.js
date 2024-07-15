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
import HomeView from './Views/HomeView'; 
import SignUpView from './Views/SignUpView';
import CartModel from '../src/Action/Cart';
import CartItemModel from './Action/CartItem';
import LoginController from './Controllers/LoginController';
import CartIView from './Views/CartView';
import ProductDetailsView from './Views/ProductDetailsView';
import HomeController from './Controllers/HomeController';
import AccountDetailsController from './Controllers/AccountDetailsController';
import CartController from './Controllers/CartController';

const App = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [updateProducts, setUpdateProducts] = useState([]);
  const [removeProduct, setremoveProduct] = useState ([]);
  const [User_Id, setUserId] = useState(null); // State variable for storing User_Id

  console.log("User_Id on App after initializing",User_Id);
  
  useEffect(() => {
    const handleCartClick = async (User_Id) => {
      if(User_Id){  
        console.log("User_Id on App in handleCartClick", User_Id);
      try {
            const cartProduts = await CartModel.fetchCartProducts(User_Id);
            console.log("User_Id on App", User_Id);
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

  const handleAddToCart = (User_Id, productId, quantity, price) => {
    // Implement the logic to add product to cart
    console.log(`User ${User_Id} added product ${productId} with quantity ${quantity} and price ${price} to the cart.`);
  };

  console.log("User_Id on App before sending as prop",User_Id);

  const handleLogout =()=> {
    console.log("inside handleLogout function");
    HomeModel.handleLogout();
    console.log('User logged out');
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
          <Route path="/Account" element={<AccountDetailsController setUserId={setUserId}/>} />           
          <Route path="/product-details" element={<ProductDetailsView handleAddToCart={handleAddToCart}/>} />
        </Routes> 
        {User_Id && <CartController userId={User_Id} />} {/* Render CartController if User_Id is set */} 
      </div>     
    </Router>  
  );
};

export default App;