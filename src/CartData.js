// //Cart.js originally

// import React, { useState, useEffect } from 'react';
// import CartItem from './CartItem';
// import './Cart.css';

// const Cart = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     let cart = localStorage.getItem('cart') || '[]'; 
//     cart = JSON.parse(cart);
//     setProducts(cart);
//   }, []);

//   const updateQuantity = (id, newQuantity) => {
//     const updatedProducts = products.map(item =>
//       item.P_Id === id ? { ...item, Buy_Quantity: newQuantity, Total_Price: newQuantity * item.Price } : item
//     );
//     setProducts(updatedProducts);
//     localStorage.setItem('cart', JSON.stringify(updatedProducts));
//   };

//   const removeItem = (id) => {
//     const updatedProducts = products.filter(item => item.P_Id !== id);
//     setProducts(updatedProducts);
//     localStorage.setItem('cart', JSON.stringify(updatedProducts));
//   };

//   const getTotalPrice = () => {
//     return products.reduce((total, item) => total + item.Total_Price, 0);
//   };

//   return (
//     <div className="shopping-cart">
//       <h2>Your Shopping Cart</h2>
//       {products.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div>
//           {products.map(item => (
//             <CartItem 
//               key={item.P_Id} // Ensure key is unique and correct
//               item={item} 
//               className="qty-container" 
//               updateQuantity={updateQuantity} 
//               removeItem={removeItem} 
//             />
//           ))}
//           <div className="cart-total">
//             <h3>Total: ₹{getTotalPrice()}</h3>
//             <button onClick={() => alert('Proceeding to checkout...')}>Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
