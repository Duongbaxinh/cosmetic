import { BASE_API, PROMOTION_API } from "@/config/api.config";
import { Promotion } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  endpoints: (builder) => ({
    getAllPromotion: builder.query<Promotion[], void>({
      query: () => PROMOTION_API,
    }),
    getDetailPromotion: builder.query<Promotion, string>({
      query: (promotion) => `${PROMOTION_API}/${promotion}`,
    }),
  }),
});

export const { useGetAllPromotionQuery, useGetDetailPromotionQuery } =
  promotionApi;
