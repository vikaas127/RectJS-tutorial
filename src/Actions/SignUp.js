// src/models/UserModel.js

import axios from 'axios';

export default class SignUpModel {
    constructor(name, email, password, contact, city, state, pincode) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.contact = contact;
      this.city = city;
      this.state = state;
      this.pincode = pincode;
    }
  
    async signup() {
      const data = {
        Name: this.name,
        Email: this.email,
        Password: this.password,
        Contact: this.contact,
        City: this.city,
        State: this.state,
        Pincode: this.pincode
      };
  
      const response = await axios.post('http://localhost:3001/api/signup', data, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      return response.data;
    }
  }
  