// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
// import './login.css'; // Import CSS file
// import checkUserExists from './UserExist';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

// const handleSignUpClick = () => {
//   navigate("/Signup");
// }

// const navigateToForgetPasswordPage = () => {
//   navigate("/ForgetPassword")
// };

//  const handleSubmit = async (event) => {
//     event.preventDefault();

//   // Call checkUserExists to verify user credentials
//     const userExists = await checkUserExists(email, password);
//     if (userExists) {
//       const authToken = sessionStorage.getItem('authToken');
//       console.log('Token retrieved from sessionStorage:', authToken);
//       navigate('/home');
//     } else {
//       setError('Invalid email or password. Please try again', error);
//     }
//   };
    
//   return (
//     <div className="Login">
//       <header className="Login-header">
//         <p>Login Credentials</p>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Email: 
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </label>
//           <br/>
//           <label>
//            Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </label>
//           <br/>
//           <Button type="submit">Login</Button>
//           </form>
//           <br/>
//           <label onClick={navigateToForgetPasswordPage}>Forget password?</label>
//           <br/> 
//           <br/>
//         <label> If you don't have an account, <span onClick={handleSignUpClick}>SignUp</span></label>
//       </header>
//     </div>
//   );
// }

// export default Login; 