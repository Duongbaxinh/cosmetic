"use client";
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./slices/product.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "./slices/category.slice";
import { brandApi } from "./slices/brand.slice";
import { authApi } from "./slices/auth.slice";
import { cartApi } from "./slices/cart.slice";
import userReducer from "./slices/auth.slice";
import shippingAddressReducer, {
  shippingAddressApi,
} from "./slices/shippingAddress.slice";
import { reviewProductApi } from "./slices/review.slice";
import { orderProductApi } from "./slices/order.slice";
import { chatApi } from "./slices/chat.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: shippingAddressReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [shippingAddressApi.reducerPath]: shippingAddressApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderProductApi.reducerPath]: orderProductApi.reducer,
    [reviewProductApi.reducerPath]: reviewProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      shippingAddressApi.middleware,
      chatApi.middleware,
      categoryApi.middleware,
      brandApi.middleware,
      cartApi.middleware,
      authApi.middleware,
      orderProductApi.middleware,
      reviewProductApi.middleware
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
