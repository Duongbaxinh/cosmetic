import { ORDER_API } from "@/config/api.config";
import { customFetchBaseQuery } from "@/redux/customeBaseQuery";
import { OrderResponse } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const orderManageApi = createApi({
  reducerPath: "orderManageApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["order"],
  endpoints: (builder) => ({
    getOrdersManage: builder.query<OrderResponse[], void>({
      query: () => "/orders",
    }),
    updateStatusOrderManage: builder.mutation<
      OrderResponse,
      { status: string; orderId: string }
    >({
      query: ({ status, orderId }) => ({
        url: `${ORDER_API}/${orderId}`,
        method: "PUT",
        body: { status: status },
      }),
      invalidatesTags: ["order"],
      transformResponse: (response: OrderResponse) => {
        return response;
      },
    }),
  }),
});

export const { useGetOrdersManageQuery, useUpdateStatusOrderManageMutation } =
  orderManageApi;
