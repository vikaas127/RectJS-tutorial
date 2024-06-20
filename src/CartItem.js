// import React, { useState } from 'react';
// import axios from 'axios';

// const CartItem = ({ item, updateQuantity, removeItem }) => {
//   const [quantity, setQuantity] = useState(item.Buy_Quantity);
//   const [totalPrice, setTotalPrice] = useState(item.Buy_Quantity * item.Price);

//   const handleQuantityChange = async (newQuantity) => {
//     console.log("handleQuantityChange", newQuantity);
//     if (newQuantity >= 1) {
//       console.log("newQuantity", newQuantity);
//       try {
//         const response = await axios.put('http://localhost:3001/api/Update_Cartproduct', {
//           User_Id: 2,
//           P_Id: item.P_Id,
//           Buy_Quantity: newQuantity,
//         });
//         console.log("Quantity", newQuantity);
//         if (response.status === 200) {
//           setQuantity(newQuantity);
//           console.log("Aftering setQuantity", newQuantity);
//           setTotalPrice(newQuantity * item.Price);
//           updateQuantity(item.P_Id, newQuantity); 
//         } else {
//           console.error('Failed to update quantity in the database');
//         }
//       } catch (error) {
//         console.error('Error updating quantity:', error);
//       }
//     }
//   };

//   const handleRemoveItem = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/Del_CartProduct`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ P_Id: productId }),
//       });

//       if (response.ok) {
//         removeItem(productId); 
//       } else {
//         console.error('Failed to delete the product from the database');
//       }
//     } catch (error) {
//       console.error('Error deleting the product:', error);
//     }
//   };

//   return (
//     <div className="cart-item">
//       <img src={item.P_Thumbnail} alt={item.P_Name} className="cart-item-image" />
//       <div className="cart-item-details">
//         <div className="item-info">
//           <h5 className="name">{item.P_Name}</h5>
//         </div>
//         <div className="quantity">
//           <p>Quantity:</p>
//           <div className="quantity-container">
//             <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
//             <input type="number" min="1" value={quantity} readOnly />
//             <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
//           </div>
//           <div className="price">
//             <p>Price: ₹{item.Price}</p>
//           </div>
//         </div>
//       </div>
//       <div className="subtotal">
//         <p>Subtotal: ₹{totalPrice}</p>
//         <button onClick={() => handleRemoveItem(item.P_Id)}>Remove</button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
