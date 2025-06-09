export type BrandType = {
  id: string;
  title: string;
  slug: string;
  image: string;
  specific: boolean;
};
export type BrandTypeResponse = {
  results: BrandType[];
  limitnumber: number;
  page: number;
  page_size: number;
  number_page: number;
  count: number;
};
