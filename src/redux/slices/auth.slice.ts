import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthDataLogin, UserProfileType } from "./../../types/auth.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5050/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "auth/me",
    }),
    login: builder.mutation({
      query: (credentials: AuthDataLogin) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (credentials: AuthDataLogin) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    changeProfile: builder.mutation({
      query: (credentials: UserProfileType) => ({
        url: "auth/profile/update",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useSignUpMutation,
  useChangeProfileMutation,
} = authApi;
