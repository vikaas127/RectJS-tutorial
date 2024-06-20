// // import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './home.css'; // Import the CSS file
// import './CategoryList.css';
// //import CategoryList from './CategoryList';
// //import productListAPiCall from './API';


// function CartAPIcall(newProductId) {
//     return new Promise((resolve, reject) => {
//         axios.post('http://localhost:3001/api/Cartproducts',
//         {
//             User_Id: 2,
           
//           },
//         {
//             headers: { 'Content-Type': 'application/json' }, },
       
//     )
//         .then(response => {
//             if (response && Array.isArray(response.data.data)) {
//                 const cartList = response.data.data.map(item => ({
//                     P_Id: item.P_Id,
//                     Cat_Id: item.Cat_Id,
//                     P_Name: item.P_Name,
//                     Desc: item.Desc,
//                     inStock: item.inStock,
//                     Buy_Quantity: item.Buy_Quantity,
//                     Price: item.Price,
//                     Total_Price: item.Total_Price,
//                     P_Thumbnail: item.P_Thumbnail

//                 }));
//                 console.log("Product List from API:", cartList);
//                 resolve(cartList); // Resolve the promise with productList
//             } else {
//                 console.error("Response data is not an array:", response.data);
//                 reject("Response data is not an array");
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching product data:', error);
//             reject(error); // Reject the promise with the error
//         });
//     });
// }


// export default  CartAPIcall;
  
