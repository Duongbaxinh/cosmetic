import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthDataLogin,
  AuthDataRegister,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  ProfileFormData,
  ResetPasswordPayload,
  UserProfileType,
} from "./../../types/auth.type";
import { RegisterResponse } from "@/types";
import {
  BASE_API,
  CHANGE_PASSWORD_API,
  FORGOT_PASSWORD_API,
  LOGIN_API,
  PROFILE_API,
  REGISTER_API,
  RESET_PASSWORD_API,
} from "@/config/api.config";
import { handleError } from "@/utils";
import { error } from "console";

// Base query không có token (cho login, register, update,...)
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
});

// Base query có token (chỉ dùng cho getUser)
const baseQueryWithToken = fetchBaseQuery({
  baseUrl: BASE_API,

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${JSON.parse(token ?? "")}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<UserProfileType, void>({
      queryFn: async (arg, api, extraOptions) => {
        const result = await baseQueryWithToken(PROFILE_API, api, extraOptions);
        if (result.error) {
          handleError(result.error);
        }
        return {
          data: result.data as UserProfileType,
        };
      },
    }),
    login: builder.mutation({
      query: (credentials: AuthDataLogin) => ({
        url: LOGIN_API,
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (dataRegister: AuthDataRegister) => ({
        url: REGISTER_API,
        method: "POST",
        body: dataRegister,
      }),
      transformResponse: (response: RegisterResponse) => {
        console.log("check register ::: ", response);
        return response;
      },
    }),
    changePassword: builder.mutation<string, ChangePasswordPayload>({
      async queryFn(changePasswordData, api, extraOptions) {
        const result = await baseQueryWithToken(
          {
            url: CHANGE_PASSWORD_API,
            method: "POST",
            body: changePasswordData,
          },
          api,
          extraOptions
        );

        if (result.error) {
          handleError(result.error);
          return { error: result.error };
        }

        // Lấy message từ response JSON
        const message = (result.data as { message: string }).message;
        return { data: message };
      },
    }),
    forgotPassword: builder.mutation<string, ForgotPasswordPayload>({
      query: (forgotPasswordPayload: ForgotPasswordPayload) => ({
        url: FORGOT_PASSWORD_API,
        method: "POST",
        body: forgotPasswordPayload,
      }),
      transformResponse: (response: string) => {
        console.log("check forgot ::: ", response);
        return response;
      },
    }),
    resetPassword: builder.mutation<string, ResetPasswordPayload>({
      query: (resetPasswordPayload: ResetPasswordPayload) => ({
        url: RESET_PASSWORD_API,
        method: "POST",
        body: resetPasswordPayload,
      }),
      transformResponse: (response: string) => {
        console.log("check reset ::: ", response);
        return response;
      },
    }),
    changeProfile: builder.mutation({
      query: (credentials: ProfileFormData) => ({
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
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user: UserProfileType | null;
};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfileType>) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
