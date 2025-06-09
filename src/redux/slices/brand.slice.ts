import { BASE_API } from "@/config/api.config";
import {
  FilterParamItem,
  ParamFilter,
  BrandType,
  BrandTypeResponse,
} from "@/types";
import { toQueryString } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  endpoints: (builder) => ({
    getBrands: builder.query<BrandTypeResponse, FilterParamItem | void>({
      query: (params) => `/brands?${toQueryString(params)}`,
    }),
    getAllBrand: builder.query<BrandType[], FilterParamItem | void>({
      query: (params) => `/brands`,
    }),
  }),
});

export const { useGetBrandsQuery, useGetAllBrandQuery } = brandApi;
