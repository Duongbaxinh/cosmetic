import {
  BASE_API,
  PROFILE_API,
  SHIPPING_ADDRESS_API,
} from "@/config/api.config";
import { handleError } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
});

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
  baseQuery: customFetchBaseQuery, // ⚠️ Dùng baseQuery có token
  endpoints: (builder) => ({
    getAddress: builder.query<ShippingAddress[], void>({
      queryFn: async (arg, api, extraOptions) => {
        const result = await baseQueryWithToken(
          SHIPPING_ADDRESS_API,
          api,
          extraOptions
        );
        if (result.error) {
          handleError(result.error);
        }
        return {
          data: result.data as ShippingAddress[],
        };
      },
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressInfo, ShippingAddress } from "@/types";
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
