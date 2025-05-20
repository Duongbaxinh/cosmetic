import {
  BellIcon,
  EyeIcon,
  InboxIcon,
  LocationIcon,
  NoteIcon,
  UserIcon,
} from "@/assets/icons";
import {
  NOTICE_URL,
  PRODUCT_OVER_URL,
  PRODUCT_REVIEW_URL,
  PROFILE_URL,
  SHIPPING_ADDRESS_URL,
} from "@/routers";
import { JSX } from "react";

export interface SidebarDetailType {
  path: string;
  icon: (props: { className?: string; fill?: string }) => JSX.Element;
  title: string;
}

export const SIDEBAR_DETAIL: SidebarDetailType[] = [
  {
    path: PROFILE_URL,
    icon: UserIcon,
    title: "Thông tin tài khoản",
  },
  {
    path: NOTICE_URL,
    icon: BellIcon,
    title: "Thông báo của tôi",
  },
  {
    path: "/order",
    icon: NoteIcon,
    title: "Quản lý đơn hàng",
  },
  {
    path: SHIPPING_ADDRESS_URL,
    icon: LocationIcon,
    title: "Sổ địa chỉ",
  },
  {
    path: PRODUCT_REVIEW_URL,
    icon: InboxIcon,
    title: "Đánh giá sản phẩm",
  },
  {
    path: PRODUCT_OVER_URL,
    icon: EyeIcon,
    title: "Sản phẩm đã xem",
  },
];
