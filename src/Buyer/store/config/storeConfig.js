import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import cartSlice from "../slice/cartSlice";

const buyerStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cartData: cartSlice.reducer,
    }
});

export const authAction = authSlice.actions;
export const cartAction = cartSlice.actions;
export default buyerStore;