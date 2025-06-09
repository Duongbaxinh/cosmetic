export type BrandType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
};
export type BrandTypeResponse = {
  results: BrandType[];
  limitnumber: number;
  page: number;
  page_size: number;
  number_page: number;
  count: number;
};
