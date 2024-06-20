// userController.js
import React, { useState, useEffect } from 'react';
import { getUserAccountDetails } from '../Context(Model)/AccountDetailsModel';
import { AccountDetailsView } from '../View/AccountDetailsView';

const AccountDetailsController = () => {
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
      const details = await getUserAccountDetails(token);
      setAccountDetails(details);
    } catch (error) {
      setError('Cannot find user account');
    }
  };

  return (
    <AccountDetailsView accountDetails={accountDetails} error={error} />
  );
};

export default AccountDetailsController;
