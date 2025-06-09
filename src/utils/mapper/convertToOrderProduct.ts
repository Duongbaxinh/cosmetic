import { OrderProduct, ProductCartDetail } from "@/types";
import { priceDiscountProductCart } from "../handleRate";

export function mapToOrderProduct(
  product: ProductCartDetail,
  quantity: number
): OrderProduct {
  const { finalPrice } = priceDiscountProductCart(product);
  return {
    id: product.id,
    product_name: product.product_name,
    product_price: finalPrice,
    product_brand: product.product_brand.title,
    product_type: product.product_type.title,
    product_thumbnail: product.product_thumbnail,
    product_discount: product.product_discount_percent,
    quantity: quantity,
  };
}
