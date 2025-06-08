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
import { productTypeApi } from "./slices/typeproduct.slice";
import { promotionApi } from "./slices/promotion.slice";
import { manageProductApi } from "./slices/manage/manageproduct.api";
import { managePromotionApi } from "./slices/manage/managepromotion.api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: shippingAddressReducer,
    [manageProductApi.reducerPath]: manageProductApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer,
    [managePromotionApi.reducerPath]: managePromotionApi.reducer,
    [productTypeApi.reducerPath]: productTypeApi.reducer,
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
      manageProductApi.middleware,
      promotionApi.middleware,
      managePromotionApi.middleware,
      productTypeApi.middleware,
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
