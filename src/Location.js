import { useState, useEffect } from 'react';
import axios from 'axios';

const Userlocation = () => {
    const [userLocation, setuserLocation] = useState([]);
  
    useEffect(() => {
      fetchUserLocation();
    }, []);
  
    const fetchUserLocation = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/Userlocation');
        console.log(response.data); // Check the response data
        setuserLocation(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };
  
    return (
      <div>
        <div>
        {Array.isArray(userLocation) && userLocation.map(location => (
        <div key={location.User_id}>
          <p>{location.City}</p>
          <p>{location.Pincode}</p>
        </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default Userlocation;
  