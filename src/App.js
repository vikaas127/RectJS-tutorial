import './App.css';
import Login from './login'; // corrected import
import Home from './home'; // corrected import
import SignUp from './Signup'; // corrected import
import ForgetPassword from './ForgetPassword'; // assuming this import is correct
import Cart from './Cart';
import ProductDetails from './ProductDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" exact component={Home} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; */

function App() {
  const handleAddToCart = (user_id, product_id, buy_quantity, price) => {
    // Define your handleAddToCart function here or pass it down from Home
    // This function can be passed to ProductDetails via route state or context
  };

  return (
    <Router>
      <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetails handleAddToCart={handleAddToCart} />} /> {/* Define the route */}
      </Routes>
    </Router>
  );
}

export default App;
