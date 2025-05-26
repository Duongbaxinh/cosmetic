import { BASE_API, SHIPPING_ADDRESS_API } from "@/config/api.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: BASE_API,

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${JSON.parse(token ?? "")}`);
    }
    return headers;
  },
});

export const shippingAddressApi = createApi({
  reducerPath: "shippingAddressApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    getAddress: builder.query<ShippingAddress[], void>({
      query: () => SHIPPING_ADDRESS_API,
    }),
    changeShippingAddress: builder.mutation({
      query: ({
        shippingId,
        shippingData,
      }: {
        shippingId: string;
        shippingData: any;
      }) => ({
        url: `/shipping-addresses/${shippingId}`,
        method: "PUT",
        body: shippingData,
      }),
    }),
    createShippingAddress: builder.mutation({
      query: (shippingAddressData: AddressInfo) => ({
        url: SHIPPING_ADDRESS_API,
        method: "POST",
        body: shippingAddressData,
      }),
    }),
  }),
});

export const { useGetAddressQuery, useCreateShippingAddressMutation } =
  shippingAddressApi;

import { AddressInfo, ShippingAddress } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customFetchBaseQuery } from "../customeBaseQuery";

type ShippingType = {
  shippingAddress: ShippingAddress[] | [];
};

const initialState: ShippingType = {
  shippingAddress: [],
};

export const shippingReducer = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    setShippingAddress: (state, action: PayloadAction<ShippingAddress[]>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = [];
      localStorage.removeItem("shippingAddress");
    },
  },
});

export const { setShippingAddress, clearShippingAddress } =
  shippingReducer.actions;
export default shippingReducer.reducer;
