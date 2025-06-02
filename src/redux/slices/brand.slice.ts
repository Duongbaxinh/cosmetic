import { BASE_API } from "@/config/api.config";
import { Brand, ProductBrand } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  endpoints: (builder) => ({
    getBrands: builder.query<ProductBrand[], void>({
      query: () => "/brands",
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
