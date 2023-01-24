import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice"
import productsReducer from "./feature/product-slice";
import categoriesReducer from "./feature/categories-slice";


const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        categories: categoriesReducer,
    }
})

export default store;