import {
  BellIcon,
  EyeIcon,
  InboxIcon,
  LocationIcon,
  NoteIcon,
  UserIcon,
} from "@/assets/icons";
import { JSX } from "react";

export interface SidebarDetailType {
  path: string;
  icon: (props: { className?: string; fill?: string }) => JSX.Element;
  title: string;
}

export const SIDEBAR_DETAIL: SidebarDetailType[] = [
  {
    path: "customer/account/edit",
    icon: UserIcon,
    title: "Thông tin tài khoản",
  },
  {
    path: "customer/notification",
    icon: BellIcon,
    title: "Thông báo của tôi",
  },
  {
    path: "/order",
    icon: NoteIcon,
    title: "Quản lý đơn hàng",
  },
  {
    path: "customer/address",
    icon: LocationIcon,
    title: "Sổ địa chỉ",
  },
  {
    path: "customer/review",
    icon: InboxIcon,
    title: "Đánh giá sản phẩm",
  },
  {
    path: "customer/look-over",
    icon: EyeIcon,
    title: "Sản phẩm đã xem",
  },
];
