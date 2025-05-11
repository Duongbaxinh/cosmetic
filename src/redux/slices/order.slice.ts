import { ResponseType, OrderCheckout, OrderResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderProductApi = createApi({
  reducerPath: "orderProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllOrder: builder.query<OrderResponse, string>({
      query: (params: any) => {
        const queryString = new URLSearchParams(params).toString();
        const url = `/orders?${queryString}`;
        return {
          url: url,
        };
      },
      transformResponse: (response: ResponseType<OrderResponse>) => {
        return response.data;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetAllOrderQuery } = orderProductApi;
