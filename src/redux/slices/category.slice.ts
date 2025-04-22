import { CategoryFilter } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getAllCategory: builder.query<CategoryFilter[], string>({
      query: () => `/categories`,
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
