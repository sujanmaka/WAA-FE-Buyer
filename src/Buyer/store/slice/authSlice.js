import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isBuyerAuthenticated: false };

const authSlice = createSlice({
    name: "buyerAuthenticaion",
    initialState: initialAuthState,
    reducers: {
        loginSuccessful(state) {
            state.isBuyerAuthenticated = true;
        },
        logout(state) {
            state.isBuyerAuthenticated = false;
        }
    }
});
export default authSlice;