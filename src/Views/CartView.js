import React from 'react';

const CartView = ({ cartProducts, updateQuantity, removeItem }) => {
  console.log("cartProducts from CartView", cartProducts);

  // Calculate grand total price
  const grandTotalPrice = cartProducts.reduce((total, product) => total + product.Price*product.Buy_Quantity, 0);

  return (
    <div className="cart-container">
      {cartProducts.length === 0 ? (
        <p>No product in your cart</p>
      ) : (
        <>
          {cartProducts.map(product => (
            <div key={product.P_Id} className="cart-item">
              <img src={product.P_Thumbnail} alt={product.P_Name} />
              <div className="cart-details">
                <h3>{product.P_Name}</h3>
                <p>Price: ₹{product.Price}</p>
                <div className='quantity-controller'>
                  <p>Quantity:</p>
                  <button onClick={() => updateQuantity(product.P_Id, product.Buy_Quantity - 1)}disabled={product.Buy_Quantity <= 1}>-</button>
                  <span>{product.Buy_Quantity}</span>
                  <button onClick={() => updateQuantity(product.P_Id, product.Buy_Quantity + 1)}>+</button>
                </div>
              </div>
              <div className='total-price'>
                <p>Total Price: ₹{product.Price* product.Buy_Quantity}</p>
                <button onClick={() => { console.log("Remove button clicked", product.P_Id); removeItem(product.P_Id); }}>Remove</button>
              </div>
            </div>
          ))}
          <div className="grand-total">
            <h2>Grand Total: ₹{grandTotalPrice}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;
