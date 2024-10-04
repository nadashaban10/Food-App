import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import categoriesReducer from './reducers/categoriesSlice'
import searchReducer from "./reducers/searchSlice";

export const store = configureStore({
        reducer: {
                products: productsReducer,
                categories: categoriesReducer,
                search: searchReducer,
        }
});