import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const { quantity, id } = action.payload;
            const itemExists = state.find((item) => item.id === id);
            if (itemExists) {
                itemExists.quantity += quantity;
            } else {
                state.push({ ...action.payload, quantity: quantity });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            item.quantity++;
        },
        setUpdateQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload.id);
            item.quantity = action.payload.quantity;
        },
        decrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                const index = state.findIndex((item) => item.id === action.payload);
                state.splice(index, 1);
            } else {
                item.quantity--;
            }
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
        },
        resetCart: (state) => {
            state.splice(0, state.length);
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    incrementQuantity,
    setUpdateQuantity,
    decrementQuantity,
    removeFromCart,
    resetCart,
} = cartSlice.actions;
