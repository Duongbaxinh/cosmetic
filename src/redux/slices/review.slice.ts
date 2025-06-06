import { ReviewImagePayload, ReviewPayload, ReviewResponse } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../customeBaseQuery";

export const reviewProductApi = createApi({
  reducerPath: "reviewProductApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    getReviewProductById: builder.query<ReviewResponse[], string>({
      query: (id: string) => `/review/${id}`,
      transformResponse: (response: ReviewResponse[]) => {
        return response;
      },
      keepUnusedDataFor: 0,
    }),
    reviewProduct: builder.mutation<ReviewResponse, ReviewPayload>({
      query: (payload) => ({
        url: "/reviews",
        method: "POST",
        body: payload,
      }),
    }),
    saveImageReview: builder.mutation<void, ReviewImagePayload[]>({
      query: (payload) => ({
        url: "/image_review",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetReviewProductByIdQuery,
  useReviewProductMutation,
  useSaveImageReviewMutation,
} = reviewProductApi;
