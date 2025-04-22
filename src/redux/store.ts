"use client";
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./slices/product.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "./slices/category.slice";
import { brandApi } from "./slices/brand.slice";
import { authApi } from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoryApi.middleware,
      brandApi.middleware,
      authApi.middleware
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
