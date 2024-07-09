// getUserAccountDetails.js
import axios from 'axios';

export const UserAccountDetails = async (token) => {
  try {
    const response = await axios.post('http://localhost:3001/api/userDetails', {
      Token: token
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("Response UserAccountDetails API",response);
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map(item => ({
        User_id: item.User_id,
        Name: item.Name,
        Email: item.Email,
        Contact: item.Contact,
        City: item.City,
        State: item.State,
        Pincode: item.Pincode,
        Profile_image: item.Profile_image
      }));
    } 
    else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error("Error fetching user account:", error);
    throw error;
  }
};
