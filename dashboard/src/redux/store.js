import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import categoriesReducer from './reducers/categoriesSlice'

export const store = configureStore({
        reducer: {
                products: productsReducer,
                categories: categoriesReducer,
        }
});