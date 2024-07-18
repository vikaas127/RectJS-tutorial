import React from 'react';

const CartView = ({ cartProducts, updateQuantity, removeItem }) => {
  console.log("cartProducts from CartView", cartProducts);

  return (
    <div className="cart-container">
      {cartProducts.map(product => (
        <div key={product.P_Id} className="cart-item">
          <img src={product.P_Thumbnail} alt={product.P_Name} />
          <div className="cart-details">
            <h3>{product.P_Name}</h3>
            <p>Price: ₹{product.Price}</p>
            <div className='quantity-container'>
              <p>Quantity:</p>
              <button onClick={() => updateQuantity(product.P_Id, product.Buy_Quantity - 1)}>-</button>
              <span>{product.Buy_Quantity}</span>
              <button onClick={() => updateQuantity(product.P_Id, product.Buy_Quantity + 1)}>+</button>
            </div>
          </div> 
          <div className='subtotal'>
            <p>Total Price: ₹{product.Total_Price}</p>
            <button onClick={() => { console.log("Remove button clicked", product.P_Id); removeItem(product.P_Id); }}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartView;
