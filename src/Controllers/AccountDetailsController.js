// userController.js
import React, { useState, useEffect } from 'react';
import { UserAccountDetails } from '../Action/AccountDetails';
import { AccountDetailsView } from '../Views/AccountDetailsView';

const AccountDetailsController = (onFetchComplete) => {
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

  const handleUserAccount = async (token) => {
    try {
      const accountDetails = await UserAccountDetails(token);
      console.log("UserDetails from AccountDetailsController", accountDetails);
      setAccountDetails(accountDetails);
    } catch (error) {
      setError('Cannot find user account');
    }
  };

  return (
    <AccountDetailsView accountDetails={accountDetails} error={error} />
  );
};

export default AccountDetailsController;
