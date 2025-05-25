import { Brand } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brands",
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
