import React, { useState } from 'react';
import axios from 'axios';


const CartItem = ({ item, updateQuantity, removeItem }) => {
  const [quantity, setQuantity] = useState(item.Buy_Quantity);
  const [Total_Price, setTotalPrice] = useState(item.Total_Price); 

/*  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.P_Id, newQuantity);
  }; */


  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity >= 1) {
      try {
        const response = await axios.put('http://localhost:3001/api/Update_CartProduct', {
          User_Id: 2, // Ensure User_Id is available in the item object
          P_Id: item.P_Id,
          Buy_Quantity: newQuantity,
        });

        if (response.status === 200) {
          // Update the quantity and total price in the local state
          setQuantity(newQuantity);
          const updatedTotalPrice = newQuantity * item.Price;
          setTotalPrice(updatedTotalPrice);

          // Optionally update the quantity in the parent component state if needed
          updateQuantity(item.P_Id, newQuantity, updatedTotalPrice);
        } else {
          console.error('Failed to update quantity in the database');
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  }; 


  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/Del_CartProduct`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ P_Id: productId }),
      });

      if (response.ok) {
        removeItem(productId); // Call the removeItem function passed as a prop to update the state in the parent component
      } else {
        console.error('Failed to delete the product from the database');
      }
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  return (
    <div key={item.P_Id} className="cart-item">
      <img src={item.P_Thumbnail} className="cart-item-image" />
      <div className="cart-item-details">
        <div className="item-info">
          <h5 className="name">{item.P_Name}</h5>
        </div>
        <div className="quantity">
          <p>Quantity:</p>
            <div className="quantity-container">
              <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
              <input
                type="number"
                min="1"
                value={quantity}
                readOnly
              />
              <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
            </div>
          <div className="price">
            <p>Price: ₹{item.Price}</p>
          </div>
         </div>
      </div>
      <div className='subtotal'>
        <p>Subtotal: ₹{item.Total_Price}</p>
        <button onClick={() => handleRemoveItem(item.P_Id)}>Remove</button>
      </div>
    </div>
);
};

export default CartItem;
