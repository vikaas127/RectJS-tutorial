import logo from './logo.svg';
import './App.css';
import Login from './login'; // corrected import
import Home from './home'; // corrected import
import SignUp from './SignUp'; // corrected import
import ForgetPassword from './ForgetPassword'; // assuming this import is correct

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
