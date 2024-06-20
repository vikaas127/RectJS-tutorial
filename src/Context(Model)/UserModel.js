// // src/models/UserModel.js
// import axios from 'axios';

// export default class UserModel {
//   static async fetchUserLocation(token) {
//     try {
//       const response = await axios.post('http://localhost:3001/api/Userlocation', {
//         Token: token
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data && Array.isArray(response.data.data)) {
//         return response.data.data.map(item => ({
//           Name: item.Name,
//           City: item.City,
//           Pincode: item.Pincode
//         }));
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       throw error;
//     }
//   }

//   static isLogin() {
//     return sessionStorage.getItem('isLogin') === 'True';
//   }

//   static handleLogout() {
//     sessionStorage.removeItem('authToken');
//     sessionStorage.setItem('isLogin', 'False');
//   }
// }
