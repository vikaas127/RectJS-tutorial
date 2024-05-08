import logo from './logo.svg';
import './App.css';

import './SignUp.js';
import './ForgetPassword';

import SignUp from './SignUp.js';
import ForgetPassword from './ForgetPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
