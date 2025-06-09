import { FilterProductType } from "@/types";

export const initFilter: FilterProductType = {
  limitnumber: 10,
  page: 1,
  product_brand: [],
  product_categories: [],
  product_discount: null,
  product_price: [],
  product_type: [],
  textSearch: "",
  product_sold: [],
};

export const productLabels = [
  { key: "product_thumbnail", label: "Hình ảnh" },
  { key: "product_name", label: "Tên sản phẩm" },
  { key: "product_price", label: "Giá sản phẩm" },
  { key: "product_type", label: "Loại sản phẩm" },
  { key: "product_brand", label: "Thương hiệu" },
  { key: "product_category", label: "Danh mục" },
  { key: "product_made", label: "Xuất xứ" },
  // { key: "product_discount", label: "Có chiết khấu" },
  { key: "product_discount_start", label: "Thời gian bắt đầu chiết khấu" },
  { key: "product_discount_end", label: "Thời gian kết thúc chiết khấu" },
  { key: "product_sold", label: "Số lượng đã bán" },
  { key: "product_international", label: "Sản phẩm quốc tế" },
  { key: "product_rate", label: "Đánh giá" },
  { key: "product_ingredient", label: "Thành phần" },
];

export const initFilterProduct: FilterProductType = {
  limitnumber: 10,
  page: 1,
  product_brand: [],
  product_category: [],
  product_type: [],
  price: { key: "", value: [] },
  rate: null,
  sortPrice: "",
  order: "asc",
  sortBy: "",
};
