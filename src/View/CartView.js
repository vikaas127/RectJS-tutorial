// CartView.js

import React, { useState, useEffect } from 'react';
import CartController from '../Controller/CartController';

function CartView() {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        async function fetchCartData() {
            const cartController = new CartController();
            try {
                const cartData = await cartController.fetchCart(4); // Assuming User_Id is 2
                setCartList(cartData);
            } catch (error) {
                console.error('Error fetching cart data in component:', error);
            }
        }
        
        fetchCartData();
    }, []);

    return (
        <div>
            <h2>Shopping Cart</h2>
            {/*<ul>
                {cartList.map(item => (
                    <li key={item.P_Id}>
                        {item.P_Name} - {item.Price}
                    </li>
                ))}
            </ul> */}
            Waiting for akshay's item cart.
        </div>
    );
}

export default CartView;
