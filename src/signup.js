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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending data to create a new user
      const response = await axios.post(
        'http://localhost:3001/api/signup',
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

      window.alert(response.data.message);
    } catch (error) {
      if (error) {
        console.log("error: ", error);
        window.alert("User already exists", error);
      } else {
        // For other errors, show a generic error message
        window.alert("An error occurred. Please try again later.");
      }
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
