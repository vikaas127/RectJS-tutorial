import logo from './logo.svg';
import './App.css';
import Login from './login'; // corrected import
import Home from './home'; // corrected import
import signup from './signup'; // corrected import
import ForgetPassword from './ForgetPassword'; // assuming this import is correct

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
