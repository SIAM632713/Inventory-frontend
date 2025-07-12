import {configureStore} from "@reduxjs/toolkit";
import brandAPI from "@/redux/feature/brandAPI/brandAPI.js";
import categoryAPI from "@/redux/feature/categoryAPI/categoryAPI.js";
import productAPI from "@/redux/feature/productAPI/product.API.js";

export const store=configureStore(({
    reducer: {
      [brandAPI.reducerPath]:brandAPI.reducer,
        [categoryAPI.reducerPath]:categoryAPI.reducer,
        [productAPI.reducerPath]:productAPI.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(brandAPI.middleware,categoryAPI.middleware,productAPI.middleware),
}))