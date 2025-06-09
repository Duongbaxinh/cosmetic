import { customFetchBaseQuery } from "@/redux/customeBaseQuery";
import { ProductImageType, Product, ProductFormData } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}
export const manageProductApi = createApi({
  reducerPath: "manageProductApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["IProduct"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product | Product[], ProductFormData[]>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["IProduct"],
    }),
    updateProduct: builder.mutation<Product, ProductFormData>({
      query: (product) => ({
        url: `/products/${product.product_slug}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["IProduct"],
    }),
    createProductImages: builder.mutation<ProductImageType, ProductImageType[]>(
      {
        query: (product) => ({
          url: "/product-images",
          method: "POST",
          body: product,
        }),
        invalidatesTags: ["IProduct"],
      }
    ),
    deleteProductImage: builder.mutation<void, { imageId: string }>({
      query: ({ imageId }) => ({
        url: `/product-images/${imageId}`,
        method: "DELETE",
      }),
    }),
    updateProductImages: builder.mutation<ProductImageType, ProductImageType[]>(
      {
        query: (product) => ({
          url: "/product-images",
          method: "PUT",
          body: product,
        }),
        invalidatesTags: ["IProduct"],
      }
    ),
    deleteProduct: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["IProduct"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useCreateProductImagesMutation,
  useDeleteProductMutation,
  useUpdateProductImagesMutation,
  useUpdateProductMutation,
  useDeleteProductImageMutation,
} = manageProductApi;
