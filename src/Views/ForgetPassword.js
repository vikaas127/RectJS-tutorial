// ForgetPassword.js
import React, { useState } from 'react';
import './ForgetPassword.css'; // Import CSS file
import PasswordResetModel from '../Action/ForgotPassword';
import PasswordResetController from '../Controllers/ForgotPasswordController';

function ForgetPassword() {
    const [model] = useState(new PasswordResetModel());
    const [controller] = useState(new PasswordResetController(model));
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        controller.setEmail(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
        controller.setContact(e.target.value);
    };

    const handleSubmit = (event) => {
        controller.handleSubmit(event);
    };

    return (
        <div className="ForgetPassword">
            <label>To change your password, verify it's you!</label>
            <br />
            <br />
            <label>
                Email:
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default ForgetPassword;
