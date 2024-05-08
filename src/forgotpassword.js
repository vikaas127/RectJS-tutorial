import React, { useState } from 'react';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can put your submission logic here
    };

    return (
        <div>
            <label>To change your password, verify it's you!</label>
            <br />
            <br />
            <label>
                Enter your email:
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br />
            <br />
            <label> OR </label>
            <br />
            <br />
            <label>
                Enter your Contact:
                <input
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    maxLength={15}
                />
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default ForgetPassword;
