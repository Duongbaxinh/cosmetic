export type TCheckoutPage = {
  order_id: string;
};

export type FilterProductType = {
  limitnumber: number;
  page: number;
  product_type?: { title: string; value: string }[];
  brand?: { title: string; value: string }[];
  rate?: number | null;
  price?: {
    key: string | null;
    value: (number | null)[];
  };
  sortBy?: string | null;
  sortPrice?: "" | "asc" | "desc";
  order?: "asc" | "desc";
  textSearch?: string;
};
