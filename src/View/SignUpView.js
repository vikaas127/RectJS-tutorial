// src/View/SignUpView.js

import React, { useState } from 'react';
// import './App.css';
import { Button } from 'react-bootstrap';
// import './Sign.css';
import SignupController from '../Controller/SignupController';

function SignUpView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
 

  const controller = new SignupController({
    showMessage: (message) => window.alert(message)
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await controller.handleSignup(name, email, password, contact, city, state, pincode);
  };

  return (
    <div className="Signup">
      <header className="Signup-header">
        <p>Signup Credentials</p>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={25}
            />
          </label>
          <br />
          <label>Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label>Contact:
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              maxLength={15}
            />
          </label>
          <br />
          <label>City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={10}
            />
          </label>
          <br />
          <label>State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              maxLength={10}
            />
          </label>
          <br />
          <label>Pincode:
            <input
              type="tel"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
            />
          </label>
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </header>
    </div>
  );
}

export default SignUpView;
