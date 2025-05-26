import { BASE_API, REFETCH_TOKEN_API } from "@/config/api.config";
import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { FetchArgs } from "@reduxjs/toolkit/query";

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
});

export const baseQuery = fetchBaseQuery({
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
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;
    if (refreshToken) {
      try {
        const parsedRefreshToken = JSON.parse(refreshToken);
        const refreshResult = await refreshBaseQuery(
          {
            url: REFETCH_TOKEN_API,
            method: "POST",
            body: { refresh_token: parsedRefreshToken },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as any).access_token;
          const newRefreshToken = (refreshResult.data as any).refresh_token;
          localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
          localStorage.setItem("refreshToken", JSON.stringify(newRefreshToken));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.error("Failed to refresh token:", refreshResult.error);
          localStorage.clear();
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to parse refreshToken:", error);
        localStorage.clear();
        return {
          error: { status: "CUSTOM_ERROR", error: "Invalid refresh token" },
        };
      }
    }
  }
  return result;
};
