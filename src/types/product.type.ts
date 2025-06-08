export enum ProductEnum {
  "PRODUCT_INTERNAL" = "product_internationals",
  "PRODUCT_DISCOUNT" = "product_discounts",
}
export interface ImageProduct {
  id?: string;
  product_id?: string;
  image_url: string;
  alt_text: string;
  is_primary?: boolean;
}
