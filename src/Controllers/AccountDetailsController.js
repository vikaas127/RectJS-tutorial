// userController.js
import React, { useState, useEffect } from 'react';
import { UserAccountDetails } from '../Action/AccountDetails';
import { AccountDetailsView } from '../Views/AccountDetailsView';

const AccountDetailsController = ({setUserId}) => {
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
      const User_Id = accountDetails.length > 0 ? accountDetails[0].User_id : null;
      console.log("User_Id on AccountDetailsController", User_Id);
      setUserId(User_Id); 
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
