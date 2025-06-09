import { OrderProduct, OrderProductDetail } from "@/types";

export const mapOrderProductDetailsToOrderProducts = (
  details: OrderProductDetail[]
): OrderProduct[] => {
  return details.map((detail) => ({
    id: detail.product.id,
    product_name: detail.product.product_name,
    product_price: detail.product.product_price,
    product_brand: detail.product.product_vendor.name,
    product_type: detail.product.product_type?.title || "",
    product_thumbnail: detail.product.product_thumbnail,
    product_discount: detail.product.product_discount_percent,
    quantity: detail.quantity,
    created_at: detail.created_at,
    updated_at: detail.updated_at,
  }));
};
