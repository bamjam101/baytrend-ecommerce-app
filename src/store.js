import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice"
import productsReducer from "./feature/product-slice";


const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
    }
})

export default store;