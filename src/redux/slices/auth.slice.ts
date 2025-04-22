import { AuthDataLogin, AuthType } from "./../../types/auth.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    singUp: builder.mutation({
      query: (credentials: AuthDataLogin) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation, useSingUpMutation } = authApi;
