// userView.js
import React from 'react';
// import './userAccount.css';

export const AccountDetailsView = ({ accountDetails, error }) => (
  <div>
    {error && <p>{error}</p>}
    {Array.isArray(accountDetails) && accountDetails.map((account) => (
      <div key={account.User_id}>
        <div className='AccountDetails'>
          <ul>
            <li>
              <img src={account.Profile_image} width={300} height={300} alt={`${account.Name}'s profile`} />
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
