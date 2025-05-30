import { ResponseType, Review, ReviewResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewProductApi = createApi({
  reducerPath: "reviewProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getReviewProductById: builder.query<Review, string | number>({
      //   query: (id: string) => `/review/${id}`,
      query: (id: string) => `/reviews`,
      transformResponse: (response: ResponseType<Review>) => {
        return response.data;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetReviewProductByIdQuery } = reviewProductApi;
