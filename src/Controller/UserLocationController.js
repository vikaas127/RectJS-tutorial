// // UserLocationController.js
// import React, { useEffect, useState } from 'react';
// import UserLocationModel from '../Context(Model)/UserLocationModel';
// import UserLocationView from '../View/UserLocationView';

// const UserLocationController = ({ onUpdateUserLocation }) => {
//     const [error, setError] = useState(null);
//     const userLocationModel = new UserLocationModel();

//     useEffect(() => {
//         const token = sessionStorage.getItem('authToken');
//         if (token) {
//             fetchUserLocation(token);
//         } else {
//             setError('Update location');
//         }
//     }, []);

//     const fetchUserLocation = async (token) => {
//         try {
//             const userDetails = await userLocationModel.fetchUserLocation(token);
//             onUpdateUserLocation(userDetails);
//         } catch (error) {
//             console.error("Error fetching user location:", error);
//             setError('Cannot find user location');
//         }
//     };

//     return <UserLocationView error={error} />;
// };

// export default UserLocationController;
