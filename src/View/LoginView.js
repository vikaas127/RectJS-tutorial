// LoginView.js
import React from 'react';
import { Button } from 'react-bootstrap';


const LoginView = ({ email, setEmail, password, setPassword, handleSubmit, handleSignUpClick, navigateToForgetPasswordPage, error }) => {
  return (
    <div className="Login">
      <header className="Login-header">
        <p>Login Credentials</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email: 
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br/>
          <label>
            Password:
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br/>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
};

export default LoginView;
