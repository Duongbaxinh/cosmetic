import { BASE_API } from "@/config/api.config";
import { ProductType, ProductTypeResponse } from "@/types";
import { toQueryString } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productTypeApi = createApi({
  reducerPath: "productTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ["productType"],
  endpoints: (builder) => ({
    getAllType: builder.query<ProductTypeResponse, any>({
      query: (param) => `/types?${toQueryString(param)}`,
      providesTags: ["productType"],
    }),
  }),
});

export const { useGetAllTypeQuery } = productTypeApi;
