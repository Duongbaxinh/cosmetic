// src/services/productApi.ts
import { BASE_API } from "@/config/api.config";
import { Product, ProductResponse } from "@/types";
import { toQueryString } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    searchProducts: builder.query<Product[], ParamsType>({
      query: (params: any) => {
        const queryString = toQueryString(params);
        const url = `/products?${queryString}`;
        return {
          url: url,
          timeout: 10000,
        };
      },
      transformResponse: (response: Product[]) => {
        return response;
      },
      keepUnusedDataFor: 0,
    }),
    getAllProducts: builder.query<ProductResponse, ParamsType | void>({
      query: (params: any) => {
        const queryString = toQueryString(params);
        const url = `/products?${queryString}`;
        console.log("check product filter :::: ", url);
        return {
          url: url,
          timeout: 10000,
        };
      },
      transformResponse: (response: ProductResponse) => {
        return response;
      },
      providesTags: ["Product"],
    }),
    getProductFilter: builder.query<ProductResponse, ParamsType>({
      query: (params: any) => {
        const queryString = toQueryString(params);

        const url = `/products?${queryString}`;
        console.log("check product filter :::: ", url);
        return {
          url: url,
          timeout: 10000,
        };
      },
      transformResponse: (response: ProductResponse) => {
        return response;
      },
      providesTags: ["Product"],
      keepUnusedDataFor: 0,
    }),
    getAllProductsInternal: builder.query<ProductResponse, ParamsType>({
      query: (params: any) => {
        const queryString = toQueryString(params);

        const url = `/products?${queryString}`;
        return {
          url: url,
          timeout: 10000,
        };
      },
      transformResponse: (response: ProductResponse) => {
        return response;
      },
      providesTags: ["Product"],
    }),
    getAllProductsDiscount: builder.query<ProductResponse, ParamsType>({
      query: (params: any) => {
        const queryString = toQueryString(params);
        const url = `/products?${queryString}`;
        return {
          url: url,
          timeout: 10000,
        };
      },
      transformResponse: (response: ProductResponse) => {
        return response;
      },
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      // query: (id) => {
      //   return {
      //     url: "http://localhost:5001/1",
      //   };
      // },
      transformResponse: (response: Product) => {
        return response;
      },
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
  useSearchProductsQuery,
} = productApi;
