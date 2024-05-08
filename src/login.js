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
//console.log("response", response)
    // Check the response status to determine if the user exists
//    return response.status === 200;
 // Check if login was successful (status code 200) and token is received
 if (response.status === 200 && response.data.token) {
    // Save the token in local storage or session storage for later use
    localStorage.setItem('jwtToken', response.data.token);
    // Return true to indicate that user exists and login was successful
    return true;
  } else {
    // If login fails or token is not received, return false
    return false;
  }
} catch (error) {
    // Handle network errors, server errors, etc.
    console.error("Error:", error);
    alert("User doesn't exist, go to SignUp to create an account")
    // Log any errors and throw them for handling in handleSubmit
    throw error;
  }
};
//} catch (error) {
  // Handle network errors, server errors, etc.
//  console.error("Error:", error);
  // Log any errors and throw them for handling in handleSubmit
//  throw error;
//}
// };
//  } catch (error) {
//    console.log("error",error);
//    alert("User doesn't exist, go to SignUp to create an account")
//    // Log any errors and throw them for handling in handleSubmit
//    throw error;
//  }
// };

    // Function to check if the user exists in the database
const generateToken = async (Email, Password) => {
    try {
      // Make a request to your backend API to verify user credentials
      const response = await axios.post(
        'http://localhost:3001/api/login',
        { Email, Password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // If the user exists (status code 200), generate a JWT token
      if (response.status === 200) {
        // Generate a JWT token using user data or some identifier
        const token = jwt.sign({ email: Email }, 'your_secret_key', { expiresIn: '1h' });
        return token;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Throw the error for handling in the calling function
      throw error;
    }
  };
  
  // Example usage
  generateToken('user@example.com', 'password')
    .then(token => {
      console.log("JWT Token:", token);
    })
    .catch(error => {
      console.error("Error:", error.message);
    });

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
