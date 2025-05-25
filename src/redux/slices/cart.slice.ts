import { CartCheckout } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartCheckout, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
      transformResponse: (response: CartCheckout) => {
        console.log("check cart --- ::: ", response);
        return response;
      },
    }),

    addToCart: builder.mutation<
      void,
      { cart_id: string; product_id: string; quantity: number }
    >({
      query: ({ cart_id, product_id, quantity }) => ({
        url: "/cart",
        method: "POST",
        body: { cart_id, product_id, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<
      void,
      { cart_id: string; product_id: string; quantity: number }
    >({
      query: ({ cart_id, product_id, quantity }) => ({
        url: `/cart/${product_id}`,
        method: "PUT",
        body: { cart_id, product_id, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<void, string>({
      query: (product_id) => ({
        url: `/cart/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
