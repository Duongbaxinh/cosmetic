import { BASE_API, PROMOTION_API } from "@/config/api.config";
import { customFetchBaseQuery } from "@/redux/customeBaseQuery";
import { Promotion, PromotionFormType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const managePromotionApi = createApi({
  reducerPath: "managePromotionApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    getAllPromotion: builder.query<Promotion[], void>({
      query: () => PROMOTION_API,
    }),
    createPromotion: builder.mutation<Promotion[], PromotionFormType>({
      query: (payloadPromotion) => ({
        url: PROMOTION_API,
        method: "POST",
        body: payloadPromotion,
      }),
    }),
    getDetailPromotion: builder.query<Promotion, string>({
      query: (promotion) => `${PROMOTION_API}/${promotion}`,
    }),
  }),
});

export const {
  useGetAllPromotionQuery,
  useGetDetailPromotionQuery,
  useCreatePromotionMutation,
} = managePromotionApi;
