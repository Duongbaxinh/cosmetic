import { FilterProductType, ProcessFlowProps } from "@/types";

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
  { key: "product_vendor", label: "Thương hiệu" },
  // { key: "product_category", label: "Danh mục" },
  { key: "product_made", label: "Xuất xứ" },
  // { key: "product_discount", label: "Có chiết khấu" },
  // { key: "product_discount_start", label: "Thời gian bắt đầu chiết khấu" },
  // { key: "product_discount_end", label: "Thời gian kết thúc chiết khấu" },
  // { key: "product_sold", label: "Số lượng đã bán" },
  // { key: "product_international", label: "Sản phẩm quốc tế" },
  // { key: "product_rate", label: "Đánh giá" },
  // { key: "product_ingredient", label: "Thành phần" },
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

import {
  FaShoppingCart,
  FaBoxOpen,
  FaTruck,
  FaHome,
  FaCheckCircle,
  FaBan,
  FaUndo,
} from "react-icons/fa";
export const processFlowData: ProcessFlowProps[] = [
  {
    id: 1,
    label: "Chờ thanh toán",
    icon: FaShoppingCart,
    line: true,
    status: "pending",
  },
  {
    id: 2,
    label: "Đã thanh toán",
    icon: FaBoxOpen,
    line: true,
    status: "confirmed",
  },
  {
    id: 3,
    label: "Đang vận chuyển",
    icon: FaTruck,
    line: true,
    status: "shipping", // In transit
  },
  {
    id: 4,
    label: "Đã giao",
    icon: FaHome,
    line: true,
    status: "delivered", // Successfully delivered
  },
  {
    id: 5,
    label: "Đã nhận hàng",
    icon: FaCheckCircle,
    line: true,
    status: "completed",
  },

  {
    id: 6,
    label: "Đã hủy",
    icon: FaBan,
    line: true,
    status: "cancelled", // Order cancelled
  },
  {
    id: 7,
    label: "Trả hàng",
    icon: FaUndo,
    line: false,
    status: "returned", // Item returned
  },
];
