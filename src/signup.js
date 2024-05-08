import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Button } from 'react-bootstrap';
//import { response } from 'express';
import './Sign.css';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending data to create a new user
      const response = await axios.post(
        'http://localhost:3001/api/create-user',
        {
          Name: name,
          Email: email,
          Password: password,
          Contact: contact
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }

      );
      console.log("response", response.response.data)
    } catch (error) {
      console.log("error", error.response.data);
      setError('Invalid username or password');
    }
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
          <Button type="submit">Submit</Button>
        </form>
      </header>
    </div>
  );
}

export default Signup;
