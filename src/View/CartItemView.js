import React from 'react';

const CartItemView = ({ item, quantity, totalPrice, handleQuantityChange, handleRemoveItem }) => {
  return (
    <div className="cart-item">
      <img src={item.P_Thumbnail} alt={item.P_Name} className="cart-item-image" />
      <div className="cart-item-details">
        <div className="item-info">
          <h5 className="name">{item.P_Name}</h5>
        </div>
        <div className="quantity">
          <p>Quantity:</p>
          <div className="quantity-container">
            <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
            <input type="number" min="1" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
          </div>
          <div className="price">
            <p>Price: ₹{item.Price}</p>
          </div>
        </div>
      </div>
      <div className="subtotal">
        <p>Subtotal: ₹{totalPrice}</p>
        <button onClick={() => handleRemoveItem(item.P_Id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItemView;
