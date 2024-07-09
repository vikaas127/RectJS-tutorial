// UserLocationModel.js
import axios from 'axios';

class UserLocationModel {
    async fetchUserLocation(token) {
        try {
            const response = await axios.post('http://localhost:3001/api/Userlocation', {
                Token: token
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                return response.data.data.map(item => ({
                    Name: item.Name,
                    City: item.City,
                    Pincode: item.Pincode
                }),
                console.log("UserLocation API data", response.data.data)
            );
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            throw error;
        }
    }
}

export default UserLocationModel;
