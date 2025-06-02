import { BASE_API } from "@/config/api.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../customeBaseQuery";

interface Product {
  id: string;
  product_name: string;
  detail_url?: string; // Add detail_url to match ChatBox expectations
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
      transformResponse: (response: { data: string }): ChatResponse => {
        // Parse the raw string response
        const rawData = response.data || "";
        const lines = rawData.split("\n").filter((line) => line.trim());
        let message = "";
        const products: Product[] = [];
        let currentProduct: Partial<Product> = {};

        lines.forEach((line) => {
          const content = line.startsWith("data: ")
            ? line.replace("data: ", "").trim()
            : line.trim();
          if (
            content.startsWith("**") &&
            !content.startsWith("**Chi tiết sản phẩm:**")
          ) {
            const productNameMatch = content.match(/\*\*(.+?)\*\*/);
            if (productNameMatch) {
              currentProduct.product_name = productNameMatch[1].trim();
            }
          } else if (content.startsWith("**Chi tiết sản phẩm:**")) {
            const urlMatch = content.match(/\[Xem chi tiết\]\((.+?)\)/);
            if (urlMatch && currentProduct.product_name) {
              const url = urlMatch[1];
              const id = url.split("/").pop() || "";
              products.push({
                id,
                product_name: currentProduct.product_name,
                detail_url: url,
              });
              currentProduct = {};
            }
          } else if (
            content &&
            !content.startsWith("-") &&
            !content.startsWith("####")
          ) {
            message += content + " ";
          }
        });

        return { message: message.trim(), data: products };
      },
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
