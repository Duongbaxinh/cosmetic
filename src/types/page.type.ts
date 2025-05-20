export type TCheckoutPage = {
  order_id: string;
};

export type FilterProductType = {
  limitnumber: number;
  page: number;
  category?: string;
  brand?: string[];
  rate?: number;
  price?: number[];
  sortBy?: string;
  sortPrice?: "" | "asc" | "desc";
  order?: "asc" | "desc";
  textSearch?: string;
};
