import { OrderProduct } from "@/types";

export const mapOrderProductsToOrderDetails = (
  orderProducts: OrderProduct[],
  orderId: string = ""
) => {
  return orderProducts.map((product) => ({
    order_id: orderId,
    product_id: product.id,
    quantity: product.quantity,
  }));
};
