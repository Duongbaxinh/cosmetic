import { ProductSelected } from "@/dashboard/component/pages/ProductPage";
import { Product } from "@/types";

export function mapProductToFormValues(product: any) {
  return {
    product_name: product.product_name || "",
    product_price: product.product_price || 0,
    product_brand_id: product.product_brand?.title || "",
    product_type_id: product.product_type?.title || "",
    product_made: product.product_made || "",
    product_stock_quantity: product.product_stock_quantity || 0,
    product_expiration_date: product.product_expiration_date
      ? new Date(product.product_expiration_date).toISOString().split("T")[0]
      : "",
    product_promotion_id: product.product_promotion?.title || "",
    product_international: product.product_international || false,
    product_discount: product.product_discount || false,
    product_discount_percent: product.product_promotion?.discount_percent || 0,
    product_discount_start: product.product_discount_start
      ? new Date(product.product_discount_start).toISOString().split("T")[0]
      : "",
    product_discount_end: product.product_discount_end
      ? new Date(product.product_discount_end).toISOString().split("T")[0]
      : "",
    product_ingredient: product.product_ingredient || "",
    product_description: product.product_description || "",
    product_thumbnail: product.product_thumbnail || "",
  };
}

export function mapProductToSelected(product: Product): ProductSelected {
  return {
    id: product.id,
    product_name: product.product_name,
    product_type: product.product_type?.title || "",
    product_price: product.product_price,
  };
}
