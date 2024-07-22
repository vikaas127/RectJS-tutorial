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
      setCartProducts(prevProducts => {
        const updatedProducts = prevProducts.filter(product => product.P_Id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        return updatedProducts;
      });
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

console.log("CartItemCount before sending as a prop",CartItemCount);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<>
            <HeaderView User_Id={User_Id} handleSearch={handleSearch} CartItemCount={CartItemCount} />
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
          <Route path="/product-details" element={<ProductDetailsView User_Id={User_Id} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
