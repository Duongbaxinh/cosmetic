// customFetchBaseQuery.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BASE_API, REFETCH_TOKEN_API } from "@/config/api.config";
import { redirect } from "next/navigation";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  prepareHeaders: (headers) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token) {
      headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
    }
    return headers;
  },
});

export const customFetchBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error?.data &&
    typeof result.error.data === "object" &&
    "code" in result.error.data &&
    (result.error.data as { code?: string }).code === "token_not_valid"
  ) {
    // Gọi refresh token
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refetchToken")
        : null;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: REFETCH_TOKEN_API,
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );
      console.log("check 00000", refreshResult);
      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as any).access_token;
        alert("access token");
        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.clear();
      }
    }
  }

  return result;
};
