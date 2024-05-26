import './App.css';
import Login from './login'; // corrected import
import Home from './home'; // corrected import
import SignUp from './Signup'; // corrected import
import ForgetPassword from './ForgetPassword'; // assuming this import is correct
import Cart from './Cart';
import ProductDetails from './ProductDetails';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
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

export default App;
