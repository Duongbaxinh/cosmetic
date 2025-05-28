import { OrderDetailType } from "./../../types/data.type";
import {
  BASE_API,
  ORDER_API,
  ORDER_DETAIL_API,
  ORDER_PAYMENT_API,
} from "@/config/api.config";
import {
  MomoPaymentResponse,
  OrderItemDisplayType,
  OrderResponse,
  OrderType,
  ResponseType,
} from "@/types";
import { toQueryString } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderProductApi = createApi({
  reducerPath: "orderProductApi",
  tagTypes: ["order"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${JSON.parse(token ?? "")}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllOrder: builder.query<OrderResponse[], string>({
      query: (params: any) => {
        const queryString = toQueryString(params);
        const url = `/orders?${queryString}`;
        return {
          url: url,
        };
      },
      transformResponse: (response: OrderResponse[]) => {
        return response;
      },
      keepUnusedDataFor: 0,
    }),
    getOrderDetail: builder.query<OrderResponse, string>({
      query: (order_id: string) => {
        const url = `${ORDER_API}/${order_id}`;
        return {
          url: url,
        };
      },
      transformResponse: (response: OrderResponse) => {
        return response;
      },
      keepUnusedDataFor: 0,
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
      OrderItemDisplayType,
      OrderDetailType | OrderDetailType[]
    >({
      query: (orderDetail: OrderDetailType | OrderDetailType[]) => ({
        url: ORDER_DETAIL_API,
        method: "POST",
        body: orderDetail,
      }),
      transformResponse: (response: OrderItemDisplayType) => {
        return response;
      },
    }),
    paymentOrder: builder.mutation<MomoPaymentResponse, string>({
      query: (order_id: string) => ({
        url: ORDER_PAYMENT_API,
        method: "POST",
        body: { order_id: order_id },
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
} = orderProductApi;
