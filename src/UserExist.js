// import axios from 'axios';

// const checkUserExists = async (Email, Password) => {
//   try {
//     const response = await axios.post(
//       'http://localhost:3001/api/login',
//       { Email, Password },
//       { headers: { 'Content-Type': 'application/json' } }
//     );

//     if (response.status === 200 && response.data.token) {
//       // Store token in sessionStorage
//       sessionStorage.setItem('authToken', response.data.token);
//       sessionStorage.setItem('isLogin', 'True');
//       console.log('Token stored in sessionStorage:', response.data.token);
//       return true;
//     } else {
//       console.error('Login failed');
//       sessionStorage.setItem('isLogin', 'False');
//       return false;
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert("User doesn't exist, go to SignUp to create an account");
//     sessionStorage.setItem('isLogin', 'False');
//     throw error;
//   }
// };

// export default checkUserExists;
