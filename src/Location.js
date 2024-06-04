/* import { useState, useEffect } from 'react';
import axios from 'axios';

const Userlocation = () => {
    const [userLocation, setuserLocation] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchUserLocation();
    }, []);
  
    const fetchUserLocation = async (email, city, pincode) => {
      try {
        const response = await axios.get('http://localhost:3001/api/Userlocation', {
          params: {
            Email: email,
            City: city,
            Pincode: pincode
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching user location:", error);
        throw error; // Re-throw the error to be handled by the caller
      }
    };
    
    // Usage of fetchUserLocation function
    const handleUserLocation = async (user_id, city, pincode) => {
      try {
        const data = await fetchUserLocation(user_id, city, pincode);
        console.log(data); // Check the response data
        if (Array.isArray(data)) {
          setuserLocation(data);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching user location:', error);
        setError('Error fetching user location');
      }
    };
  
    return (
      <div>
        <div>
        {Array.isArray(userLocation) && userLocation.map(location => (
        <div key={location.Email}>
          <p>{location.City}</p>
          <p>{location.Pincode}</p>
        </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default Userlocation; */


  import { useState, useEffect } from 'react';
  import axios from 'axios';
  
  const UserLocation = () => {
      const [userLocation, setUserLocation] = useState([]);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          // Example email for fetching the user location
          const email = 'Shreya@gmail.com';
          handleUserLocation(email);
      }, []);
  
      const fetchUserLocation = async (email) => {
          try {
              const response = await axios.post('http://localhost:3001/api/Userlocation', {
                Email: email // sending email in the request body
            }, {
                  headers: { 'Content-Type': 'application/json' },
                  params: { email }
              });

              console.log('API response:', response.data); // Log the API response

              if (response.data && Array.isArray(response.data.data)) {
                console.log("response.data.data", response.data.data);
                const userDetails = response.data.data.map(item => {
                  console.log("Processing item:", item); // Log each item
                  return {
                      Name: item.Name,
                      Email: item.Email,
                      City: item.City,
                      Pincode: item.Pincode
                  };
              });
                  console.log("UserDetails: ", userDetails)
                  return userDetails;
              } else {
                  throw new Error('Invalid response format');
              }
          } catch (error) {
              console.error("Error fetching user location:", error);
              throw error;
          }
      };
  
      // Usage of fetchUserLocation function
      const handleUserLocation = async (email) => {
        if (!email) {
            setError('Email is required');
            return;
        }

        try {
            const data = await fetchUserLocation(email);
            console.log('Processed data:', data); // Check the response data
            if (Array.isArray(data)) {
                setUserLocation(data);
            } else {
                setError('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching user location:', error);
            setError('Cannot find user location');
        }
      };
  
      return (
          <div>
              {error && <p>{error}</p>}
              {Array.isArray(userLocation) && userLocation.map((location) => (
                  <div key={location.User_id}>
                      <p>{location.City}</p>
                      <p>{location.Pincode}</p>
                  </div>
              ))}
          </div>
      );
  };
  
  export default UserLocation;
  