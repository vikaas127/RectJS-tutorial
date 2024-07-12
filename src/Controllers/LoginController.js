// LoginController.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginView from '../Views/LoginView';
import { checkUserExists } from '../Action/Login';

const LoginController = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/Signup");
  }

  const navigateToForgetPasswordPage = () => {
    navigate("/ForgetPassword");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const userExists = await checkUserExists(Email, Password);
    if (userExists) {
      const authToken = sessionStorage.getItem('authToken');
      console.log('Token retrieved from sessionStorage:', authToken);
      navigate('/home');
    } else {
      setError('Invalid email or password. Please try again');
    }
  } catch (error) {
    setError('Error occurred during login. Please try again.');
  }
 };

  return (
    <LoginView
      email={Email}
      setEmail={setEmail}
      password={Password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      handleSignUpClick={handleSignUpClick}
      navigateToForgetPasswordPage={navigateToForgetPasswordPage}
      error={error}
    />
  );
};

export default LoginController;
