import { OrderDetailType, PaymentType } from "./../../types/data.type";
import {
  BASE_API,
  ORDER_API,
  ORDER_DETAIL_API,
  ORDER_PAYMENT_API,
  PAYMENT_API,
} from "@/config/api.config";
import {
  MomoPaymentResponse,
  OrderResponse,
  OrderType,
  ResponseType,
} from "@/types";
import { toQueryString } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../customeBaseQuery";

export const orderProductApi = createApi({
  reducerPath: "orderProductApi",
  tagTypes: ["order"],
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    getAllOrder: builder.query<OrderResponse[], any>({
      query: (params: any) => {
        const queryString = toQueryString(params);
        const url = `/orders?${queryString}`;
        console.log("check url status order:::", url);
        return {
          url: url,
        };
      },
      transformResponse: (response: OrderResponse[]) => {
        return response;
      },
      providesTags: ["order"],
    }),
    getOrderDetail: builder.query<OrderResponse, string>({
      query: (order_id: string) => {
        const url = `${ORDER_API}/${order_id}`;
        return {
          url: url,
        };
      },
      transformResponse: (response: OrderResponse) => {
        console.log("check response order detail :: ", response);
        return response;
      },
      keepUnusedDataFor: 0,
    }),
    createPayment: builder.mutation<PaymentResponse, PaymentType>({
      query: (payload) => ({
        url: PAYMENT_API,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: PaymentResponse) => {
        return response;
      },
    }),
    createOrder: builder.mutation<OrderType, string>({
      query: (shippingAddressId) => ({
        url: ORDER_API,
        method: "POST",
        body: { shipping_id: shippingAddressId },
      }),
      transformResponse: (response: OrderType) => {
        return response;
      },
    }),
    cancelOrder: builder.mutation<
      OrderType,
      { status: string; orderId: string }
    >({
      query: ({ status, orderId }) => ({
        url: `${ORDER_API}/${orderId}`,
        method: "PUT",
        body: { status: status },
      }),
      invalidatesTags: ["order"],
      transformResponse: (response: OrderType) => {
        return response;
      },
    }),
    createOrderDetail: builder.mutation<
      OrderResponse,
      OrderDetailType | OrderDetailType[]
    >({
      query: (orderDetail: OrderDetailType | OrderDetailType[]) => ({
        url: ORDER_DETAIL_API,
        method: "POST",
        body: orderDetail,
      }),
      transformResponse: (response: OrderResponse) => {
        return response;
      },
    }),
    paymentOrder: builder.mutation<
      MomoPaymentResponse,
      { orderId: string; paymentMethod: "momo" | "zalopay" }
    >({
      query: (orderData) => ({
        url: `${ORDER_PAYMENT_API}/${orderData.paymentMethod}`,
        method: "POST",
        body: { order_id: orderData.orderId },
      }),
      transformResponse: (response: MomoPaymentResponse) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetOrderDetailQuery,
  useCreateOrderMutation,
  useCreateOrderDetailMutation,
  usePaymentOrderMutation,
  useCancelOrderMutation,
  useCreatePaymentMutation,
} = orderProductApi;
