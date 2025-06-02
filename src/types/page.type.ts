export type TCheckoutPage = {
  order_id: string;
};

export type FilterProductType = {
  limitnumber: number;
  page: number;
  product_category?: { title: string; value: string }[];
  product_type?: { title: string; value: string }[];
  product_brand?: { title: string; value: string }[];
  rate?: number | null;
  price?: {
    key: string | null;
    value: (number | string)[];
  };
  sortBy?: string | null;
  sortPrice?: "" | "asc" | "desc";
  order?: "asc" | "desc";
  textSearch?: string;
  [key: string]: any;
};
