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
  const [CartItemCount, setCartItemCount] = useState(0);

  const User_Id = sessionStorage.getItem("User_Id");

  useEffect(() => {
    const handleCartClick = async () => {
      if (User_Id) {
        console.log("User_Id on App in handleCartClick", User_Id);
        try {
          const cartProduts = await CartModel.fetchCartProducts(User_Id);
          console.log("cartProduts from App:", cartProduts);
          setCartProducts(cartProduts);
        } catch (error) {
          console.error('Error setting product list:', error);
        }
      } else {
        const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("cart data from localStorage", localStorageCart);
        setCartProducts(localStorageCart);
      }
    };

    console.log("CartItemCount state updated:", CartItemCount);

    fetchCartItemCount();
    handleCartClick();
  }, [User_Id, CartItemCount]);

  const fetchCartItemCount = async () => {
    if (User_Id) {
      try {
        const cartProducts = await CartModel.fetchCartProducts(User_Id);
        console.log("CartItemCount of cartProducts from App:", cartProducts.length);
        setCartItemCount(cartProducts.length);
      } catch (error) {
        console.error("Error fetching cart item count:", error);
      }
    } else {
      const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log("CartItemCount data from localStorage on App", localStorageCart.length);
      setCartItemCount(localStorageCart.length);
    }
  };

  const updateQuantity = async(productId, newQuantity) => {
    if (User_Id) {
      try{
     await CartItemModel.updateCartProduct(User_Id, productId, newQuantity)
          setCartProducts(prevProducts =>
            prevProducts.map(product =>
              product.P_Id === productId
                ? { ...product, Buy_Quantity: newQuantity, Total_Price: newQuantity * product.Price }
                : product
            )
          );
          fetchCartItemCount(); // Call fetchCartItemCount after updating quantity
        } catch (error) {
          console.error('Error updating product quantity:', error);
        };
    } else {
      const updatedProducts = cartProducts.map(product =>
        product.P_Id === productId
          ? { ...product, Buy_Quantity: newQuantity, Total_Price: newQuantity * product.Price }
          : product
      );
      setCartProducts(updatedProducts);
      localStorage.setItem('cart', JSON.stringify(updatedProducts));
      fetchCartItemCount(); // Call fetchCartItemCount after updating quantity
    }
  };

  const removeItem = async (productId) => {
    if (User_Id) {
      try {
        await CartItemModel.removeCartProduct(productId);
        setCartProducts(prevProducts => prevProducts.filter(product => product.P_Id !== productId));
        fetchCartItemCount(); // Call fetchCartItemCount after removing item
      } catch (error) {
        console.error('Error removing product:', error);
      }
    } else {
      const updatedProducts = cartProducts.filter(product => product.P_Id !== productId);
      setCartProducts(updatedProducts);
      localStorage.setItem('cart', JSON.stringify(updatedProducts));
      fetchCartItemCount(); // Call fetchCartItemCount after removing item
    }
  };
  

  const setTotalPrice = (productId, newTotalPrice) => {
    setCartProducts(prevProducts =>
      prevProducts.map(product =>
        product.P_Id === productId ? { ...product, Total_Price: newTotalPrice } : product
      )
    );
  };

  const handleLogout = () => {
    console.log("inside handleLogout function");
    HomeModel.handleLogout();
    console.log('User logged out');
  };

  const handleSearch = (searchTerm) => {
    console.log("Setting searchTerm on App", searchTerm);
    setSearchTerm(searchTerm);
    setSelectedCategory(null); // Clear category when search term is set
  };

  const handleCategory = (category) => {
    console.log("handleCategoryClick working", category);
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search term when category is set
  };
  const LayoutWithHeader = ({ children }) => (
    <>
      <HeaderView User_Id={User_Id} handleSearch={handleSearch} CartItemCount={CartItemCount} />
      {children}
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWithHeader><HomeController setCartItemCount={setCartItemCount} /></LayoutWithHeader>} />
        <Route path="/home" element={
          <LayoutWithHeader>
            <CategoryController handleCategory={handleCategory} />
            <ProductController User_Id={User_Id} searchTerm={searchTerm} category={selectedCategory} />
          </LayoutWithHeader>
        } />
        <Route path="/cart" element={
          <LayoutWithHeader>
            <CartIView
              cartProducts={cartProducts}
              setTotalPrice={setTotalPrice}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </LayoutWithHeader>
        } />
        <Route path="/login" element={<LoginController />} />
        <Route path="/Signup" element={<SignUpView />} />
        <Route path="/Account" element={
          <LayoutWithHeader>
            <AccountDetailsController />
          </LayoutWithHeader>
        } />
        <Route path="/product-details" element={
          <LayoutWithHeader>
            <ProductDetailsView User_Id={User_Id} />
          </LayoutWithHeader>
        } />
      </Routes>
    </Router>
  );
  
};

export default App;
