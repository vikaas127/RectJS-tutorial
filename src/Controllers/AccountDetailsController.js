import React, { useState, useEffect } from 'react';
import {UserAccountDetails} from '../Action/AccountDetails';
import { AccountDetailsView } from '../Views/AccountDetailsView';

const AccountDetailsController = ({ setUserId }) => {
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
    console.log("Token on AccountDetailsController:", token);
    try {
      const accountDetails = await UserAccountDetails(token);
      console.log("UserDetails from AccountDetailsController:", accountDetails);

      if (accountDetails && accountDetails.length > 0) {
        const User_Id = accountDetails[0].User_id;
        console.log("User_Id on AccountDetailsController:", User_Id);
        setAccountDetails(accountDetails);
      } else {
        throw new Error('No account details found');
      }
    } catch (error) {
      console.error("Error fetching user account details:", error);
      setError('Cannot find user account');
    }
  };

  return (
    <AccountDetailsView accountDetails={accountDetails} error={error} />
  );
};

export default AccountDetailsController;
