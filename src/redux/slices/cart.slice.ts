import { BASE_API, CART_API, PROFILE_API } from "@/config/api.config";
import { CartCheckoutType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "../customeBaseQuery";
import { handleError } from "@/utils";
import { isArray } from "lodash";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartCheckoutType, void>({
      queryFn: async (arg, api, extraOptions) => {
        const result = await customFetchBaseQuery(CART_API, api, extraOptions);
        if (result.error) {
          handleError(result.error);
        }

        return {
          data: isArray(result.data)
            ? (result.data[0] as CartCheckoutType)
            : (result.data as CartCheckoutType),
        };
      },
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<
      void,
      { cart_id: string; product_id: string; quantity: number }
    >({
      query: ({ cart_id, product_id, quantity }) => ({
        url: "/cart-details",
        method: "POST",
        body: { cart_id, product_id, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<
      void,
      { cartDetailId: string; quantity: number }
    >({
      query: ({ cartDetailId, quantity }) => ({
        url: `/cart-details/${cartDetailId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<void, string>({
      query: (cartDetailId) => ({
        url: `/cart-details/${cartDetailId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    removeMultiProductInCart: builder.mutation<void, string[]>({
      query: (productIds) => ({
        url: `/cart-details/multiple_delete`,
        method: "DELETE",
        body: {
          ids: productIds,
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "/carts/clean-cart",
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
  useRemoveMultiProductInCartMutation,
} = cartApi;
