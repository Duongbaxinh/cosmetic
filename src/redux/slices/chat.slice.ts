import { BASE_API } from "@/config/api.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../customeBaseQuery";

interface Product {
  id: string;
  product_name: string;
}

// Define the structure of the chat response
interface ChatResponse {
  message: string;
  data: Product[];
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (payload: { role: string; content: string }) => ({
        url: "/chatbot",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ChatResponse) => {
        return response;
      },
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
