import { FilterProductType, ProductFormData } from "@/types";

export const initProduct: ProductFormData = {
  product_name: "",
  product_price: 0,
  product_thumbnail: "",
  product_type_id: "",
  product_made: "",
  product_discount: false,
  product_discount_percent: 0,
  product_discount_start: "",
  product_discount_end: "",
  product_promotion_id: "",
  product_international: false,
  product_description: "",
  product_ingredient: "",
  product_stock_quantity: 0,
  product_expiration_date: "",
};
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

// Filter Product
export const displayOptions = [
  { id: "active", label: "Hàng đang kinh doanh" },
  { id: "inactive", label: "Hàng ngừng kinh doanh" },
  { id: "all", label: "Tất cả" },
];

export const discountOption = [
  { key: true, label: "Hàng đang khuyến mãi" },
  { key: false, label: "Hàng không khuyễn mãi" },
  { key: null, label: "Tất cả" },
];

export const expirations = [
  { id: null, label: "Tất cả" },
  { id: [0], label: "Đã hết hạn" },
  { id: [0, 6], label: "Dưới 6 tháng" },
  { id: [0, 12], label: "Dưới 12 tháng" },
  { id: [12], label: "Còn dài hạn" },
];

export const priceRanges = [
  { key: "under-500k", label: "Dưới 500.000₫", min: 0, max: 500000 },
  { key: "500k-1m", label: "500.000₫ - 1.000.000₫", min: 500000, max: 1000000 },
  {
    key: "1m-1,5m",
    label: "1.000.000₫ - 1.500.000₫",
    min: 1000000,
    max: 1500000,
  },
  {
    key: "1.5-2m",
    label: "1.500.000₫ - 2.000.000₫",
    min: 1500000,
    max: 2000000,
  },
  { key: "over-2m", label: "Trên 2.000.000₫", min: 2000000, max: null },
];

export const stocks = [
  { id: "all", label: "Tất cả" },
  { id: "low stock", label: "Dưới định mức tồn" },
  { id: "above stock", label: "Vượt định mức tồn" },
  { id: "out stock", label: "Hết hàng trong kho" },
];

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
