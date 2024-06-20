// CartController.js

import CartModel from '../Context(Model)/CartModel';

class CartController {
    constructor() {
        this.cartModel = new CartModel();
    }

    async fetchCart(userId) {
        try {
            return await this.cartModel.fetchCartData(userId);
        } catch (error) {
            console.error('Error in fetchCart:', error);
            throw error;
        }
    }
}

export default CartController;
