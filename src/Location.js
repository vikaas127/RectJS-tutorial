  import { useState, useEffect } from 'react';
  import axios from 'axios';
  
  const UserLocation = ({ onUpdateUserLocation }) => {
    //  const [userLocation, setUserLocation] = useState([]);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          const token = sessionStorage.getItem('authToken');
          if (token) {
            fetchUserLocation(token);
        } else {
            setError('Update location');
        }
    }, []);
  
      const fetchUserLocation = async (token) => {
          try {
              const response = await axios.post('http://localhost:3001/api/Userlocation', {
                Token: token // sending email in the request body
            }, {
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, // Set the bearer token  
                }
              }
            );

              console.log('API response:', response.data); // Log the API response

              if (response.data && Array.isArray(response.data.data)) {
                const userDetails = response.data.data.map(item => {
                  return {
                    Name: item.Name,
                      City: item.City,
                      Pincode: item.Pincode
                  };
              });
                  console.log("UserDetails: ", userDetails);
                  onUpdateUserLocation(userDetails); // Update user location data in parent component
              } else {
                  throw new Error('Invalid response format');
              }
          } catch (error) {
              console.error("Error fetching user location:", error);
              setError('Cannot find user location');
          }
      };

return (
    <div>
      {error && <p>{error}</p>}
    </div>
    );
  };
  
  export default UserLocation;
  