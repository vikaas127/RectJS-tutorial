import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './login.css'; // Import CSS file
import checkUserExists from './UserExist';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

const win = window.sessionStorage

useEffect(() => {
  const storedEmail = win.getItem('email');
  const storedPassword = win.getItem('password');
  if (storedEmail) setEmail(storedEmail);
  if (storedPassword) setPassword(storedPassword);
}, []);

useEffect(() => {
  win.setItem('email', email);
  win.setItem('password', password);
}, [email, password]);

/* const checkUserExists = async (Email, Password) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/login',
      { Email, Password },
      { headers: { 'Content-Type': 'application/json' } }
    );
 if (response.status === 200 && response.data.token) {
    sessionStorage.setItem('authToken', response.data.token);
    console.log('Token stored in sessionStorage:', response.data.token);
    return true;
  } else {
    console.error('Login failed');
    return false;
  }
} catch (error) {
    // Handle network errors, server errors, etc.
    console.error("Error:", error);
    alert("User doesn't exist, go to SignUp to create an account")
    // Log any errors and throw them for handling in handleSubmit
    throw error;
  }
}; */

const handleSignUpClick = () => {
  navigate("/Signup");
}

const navigateToForgetPasswordPage = () => {
  navigate("/ForgetPassword")
};

 const handleSubmit = async (event) => {
    event.preventDefault();

  // Call checkUserExists to verify user credentials
    const userExists = await checkUserExists(email, password);
    if (userExists) {
      navigate('/home');
    } else {
      setError('Invalid email or password. Please try again', error);
    }
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
          <br/>
          <label>
           Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br/>
          <Button type="submit">Login</Button>
          </form>
          <br/>
          <label onClick={navigateToForgetPasswordPage}>Forget password?</label>
          <br/> 
          <br/>
        <label> If you don't have an account, <span onClick={handleSignUpClick}>SignUp</span></label>
      </header>
    </div>
  );
}

export default Login; 


/* const checkUserExists = async (Email, Password) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/login',
      { Email, Password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === 200 && response.data.token) {
      win.setItem('authToken', response.data.token);
      console.log('Token stored in sessionStorage:', response.data.token);
      return true;
    } else {
      console.error('Login failed');
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    alert("User doesn't exist, go to SignUp to create an account");
    throw error;
  }
};

const fetchUserDetails = async () => {
  try {
    const token = win.getItem('authToken');
    const response = await axios.get('http://localhost:3001/api/userDetails', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

const handleSignUpClick = () => {
  navigate('/Signup');
};

const navigateToForgetPasswordPage = () => {
  navigate('/ForgetPassword');
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
        <br />
        {error && <p className="error">{error}</p>}
        <Button type="submit">Submit</Button>
      </form>
      <br />
      <label onClick={navigateToForgetPasswordPage}>Forget password?</label>
      <br />
      <br />
      <label>
        If you don't have an account, <span onClick={handleSignUpClick}>SignUp</span>
      </label>
    </header>
  </div>
);
}

export default Login; */



