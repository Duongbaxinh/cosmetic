import { BrandType } from "./brand.type";
import { Product, ProductDiscountType } from "./product.type";

export type CardProductFullProps = Pick<
  Product,
  | "id"
  | "product_name"
  | "product_price"
  | "product_thumbnail"
  | "product_rate"
  | "product_description"
> & {
  className?: string;
  product_brand: BrandType;
  product_discount?: ProductDiscountType;
  product_thumbnail_2?: string;
};
export interface ListTemplateProps {
  children: React.ReactNode;
  time?: {
    hour: number;
    minus: number;
  };
  leading?: string;
  trailing?: React.ReactNode;
  listButton?: string[];
}

export interface CategoryProps {
  img_url: string;
  title: string;
}

export interface GroupButtonProps {
  children: React.ReactNode;
}

export interface ListSpecialProps {
  title: string;
}
