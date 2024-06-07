import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userAccount.css';

const AccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      handleUserAccount(token);
    } else {
      setError('You must login to see the user details');
    }
  }, []);

  async function handleUserAccount(token) {
    try {
      const response = await axios.post('http://localhost:3001/api/userDetails', {
        Token: token
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(response.data);

      if (response.data && Array.isArray(response.data.data)) {
        const accountDetails = response.data.data.map(item => ({
          User_id: item.User_id,
          Name: item.Name,
          Email: item.Email,
          Contact: item.Contact,
          City: item.City,
          State: item.State,
          Pincode: item.Pincode,
          Profile_image: item.Profile_image
        }));

        setAccountDetails(accountDetails);
        console.log("AccountDetails: ", accountDetails);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error("Error fetching user account:", error);
      setError('Cannot find user account');
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {Array.isArray(accountDetails) && accountDetails.map((account) => (
        <div key={account.User_id}>
          <div className='AccountDetails'>
            <ul>
              <li>
                <img src={account.Profile_image} width={300} height={300} />
                <h1>{account.Name}</h1>
                <p>Contact info:  {account.Email}, {account.Contact}</p>
                <p>Address: {account.City}, {account.State}, {account.Pincode}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountDetails;
