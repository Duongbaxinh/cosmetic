import { customFetchBaseQuery } from "@/redux/customeBaseQuery";
import { Product, ProductFormData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const manageProductApi = createApi({
  reducerPath: "manageProductApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product | Product[], ProductFormData[]>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, ProductFormData>({
      query: (product) => ({
        url: `/products/${product.product_slug}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProductImage: builder.mutation<void, { imageId: string }>({
      query: ({ imageId }) => ({
        url: `/product-images/${imageId}`,
        method: "DELETE",
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeleteProductImageMutation,
} = manageProductApi;
