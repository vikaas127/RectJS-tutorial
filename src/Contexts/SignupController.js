// src/controllers/SignupController.js

import SignUpModel from '../Actions/SignUp';

export default class SignupController {
  constructor(view) {
    this.view = view;
  }
  

  async handleSignup(name, email, password, contact, city, state, pincode) {
    const user = new SignUpModel(name, email, password, contact, city, state, pincode);
    try {
      const response = await user.signup();
      this.view.showMessage(response.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.view.showMessage("User already exists");
        this.navigate("/login");
      } else {
        this.view.showMessage("An error occurred. Please try again later.");
      }
    }
  }
}
