import { BASE_API } from "@/config/api.config";
import { Category, CategoryFilter, TypeProductType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getAllCategory: builder.query<Category[], void>({
      query: () => `/categories`,
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
