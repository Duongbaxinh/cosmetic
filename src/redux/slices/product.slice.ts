// src/services/productApi.ts
import { ProductResponse, ResponseType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductResponse, ParamsType>({
      query: (params: any) => {
        const queryString = new URLSearchParams(params).toString();
        const url = `/products?${queryString}`;
        console.log("url :::: ", url);
        return {
          url: url,
        };
      },
      transformResponse: (response: ResponseType<ProductResponse>) => {
        return response.data;
      },
      providesTags: ["Product"],
    }),
    getProductFilter: builder.query<ProductResponse, ParamsType>({
      query: (params: any) => {
        const queryString = new URLSearchParams(params).toString();
        const url = `/products?${queryString}`;
        console.log("url :::: ", url);
        return {
          url: url,
        };
      },
      transformResponse: (response: ResponseType<ProductResponse>) => {
        return response.data;
      },
      providesTags: ["Product"],
      keepUnusedDataFor: 0,
    }),
    getAllProductsInternal: builder.query<ProductResponse, ParamsType>({
      query: (params: any) => {
        const queryString = new URLSearchParams(params).toString();
        const url = `/products?${queryString}`;
        return {
          url: url,
        };
      },
      transformResponse: (response: ResponseType<ProductResponse>) => {
        return response.data;
      },
      providesTags: ["Product"],
    }),
    getAllProductsDiscount: builder.query<ProductResponse, ParamsType>({
      query: (params: any) => {
        const queryString = new URLSearchParams(params).toString();
        const url = `/products?${queryString}`;
        return {
          url: url,
        };
      },
      transformResponse: (response: ResponseType<ProductResponse>) => {
        return response.data;
      },
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/products`,
      // query: (id) => `/products/${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllProductsInternalQuery,
  useGetAllProductsDiscountQuery,
  useGetProductFilterQuery,
} = productApi;
