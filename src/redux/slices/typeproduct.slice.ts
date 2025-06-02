import { BASE_API } from "@/config/api.config";
import { ProductType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productTypeApi = createApi({
  reducerPath: "productTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ["productType"],
  endpoints: (builder) => ({
    getAllType: builder.query<ProductType[], void>({
      query: () => `/types`,
      providesTags: ["productType"],
    }),
  }),
});

export const { useGetAllTypeQuery } = productTypeApi;
