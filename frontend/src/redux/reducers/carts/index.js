import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cart: [],
    },

    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        deleteFromCart: (state, action) => {
            state.cart = state.cart.filter((item, index) => {
                return action.payload !== item.id
            })
    }
    }
});

export const {
    setCart,
    addToCart,
    deleteFromCart
} = cartSlice.actions;

export default cartSlice.reducer