import { BASE_API } from "@/config/api.config";
import { TypeProductType, ProductTypeResponse } from "@/types";
import { toQueryString } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productTypeApi = createApi({
  reducerPath: "productTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ["productType"],
  endpoints: (builder) => ({
    getType: builder.query<ProductTypeResponse, any>({
      query: (param) => `/types?${toQueryString(param)}`,
      providesTags: ["productType"],
    }),
    getAllType: builder.query<TypeProductType[], void>({
      query: () => `/types`,
      providesTags: ["productType"],
    }),
  }),
});

export const { useGetTypeQuery, useGetAllTypeQuery } = productTypeApi;
