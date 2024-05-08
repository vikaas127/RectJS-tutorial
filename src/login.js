import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './login.css'; // Import CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call checkUserExists to verify user credentials
    const userExists = await checkUserExists(email, password);
    if (userExists) {
      // Navigate to the dashboard or wherever you want to go after successful login
      navigate('/home');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };
    
    // Function to check if the user exists in the database
const checkUserExists = async (Email, Password) => {
  try {
    // Make a request to your backend API to verify user credentials
    const response = await axios.post(
      'http://localhost:3001/api/login',
      { Email, Password },
      { headers: { 'Content-Type': 'application/json' } }
    );
console.log("response", response)
    // Check the response status to determine if the user exists
    return response.status === 200;
  } catch (error) {
    console.log("error",error.response.data)
    // Log any errors and throw them for handling in handleSubmit
    throw error;
  }
};

const handleSignUpClick = () => {
  navigate("/Signup");
}

const navigateToForgetPasswordPage = () => {
  // Here, you can define the logic to navigate to the forget password page
  // For example:
  navigate("/ForgetPassword")
};

  return (
    <div className="Login">
      <header className="Login-header">
        <p>Login Credentials</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email: 
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br/>
          <Button type="submit">Submit</Button>
        </form>
        <br />
        <label onClick={navigateToForgetPasswordPage}>Forget password?</label>
        <br /> 
        <br />
        <label> If you don't have an account, <span onClick={handleSignUpClick}>SignUp</span></label>
      </header>
    </div>
  );
}

export default Login;
