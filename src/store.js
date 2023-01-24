import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice"

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

export default store;