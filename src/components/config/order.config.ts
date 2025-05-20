import { OrderTabItem } from "@/types";

export const ORDER_TABS: OrderTabItem[] = [
  {
    title: "Tất cả đơn",
    status: "",
  },
  {
    title: "Chờ thanh toán",
    status: "pending",
  },
  {
    title: "Đang xử lý",
    status: "processing",
  },
  {
    title: "Đang vận chuyển",
    status: "shipping",
  },
  {
    title: "Đã giao",
    status: "delivered",
  },
  {
    title: "Đã huỷ",
    status: "cancelled",
  },
];
