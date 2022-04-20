import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cart: [], totalItems: 0, totalAmount: 0 }

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        add(state, action) {
            const itemIndex = state.cart.findIndex((value) => value.id === action.payload.id);
            if (itemIndex >= 0) {
                if (action.payload.quantity) {
                    state.cart[itemIndex].quantity += action.payload.quantity;
                    state.totalAmount += action.payload.quantity * action.payload.cost;
                } else {
                    state.cart[itemIndex].quantity += 1;
                    state.totalAmount += action.payload.cost;
                }
            }
            else {

                const temp = { ...action.payload, quantity: 1 }

                if (action.payload.quantity) {
                    temp.quantity = action.payload.quantity;
                    state.totalAmount += action.payload.quantity * action.payload.cost;
                } else {
                    state.totalItems += 1;
                    state.totalAmount += temp.cost;
                }

                state.cart.push(temp)

            }

        },
        update(state, action) {
            const indexOfData = state.cart.findIndex((value) => value.id === action.payload.id);

            const prevquantity = state.cart[indexOfData].quantity;
            const newquantity = action.payload.quantity;

            state.cart[indexOfData].quantity = action.payload.quantity;

            if (newquantity > prevquantity) {
                state.totalAmount += (newquantity - prevquantity) * action.payload.cost;
            }
            else {
                state.totalAmount -= (prevquantity - newquantity) * action.payload.cost;
            }




        },
        delete(state, action) {
            const indexOfData = state.cart.findIndex((value) => value.id === action.payload.id);
            const prevquantity = state.cart[indexOfData].quantity;

            const nextCart = state.cart.filter(value => value.id !== action.payload.id)
            state.cart = nextCart;
            state.totalItems -= 1;

            state.totalAmount -= (prevquantity * action.payload.cost);
        },
        reset(state){
            state.cart = [];
            state.totalItems = 0;
            state.totalAmount = 0;
        }
    }
});
export default cartSlice;