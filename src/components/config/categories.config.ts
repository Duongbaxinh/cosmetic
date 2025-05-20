import { CATEGORY_URL } from "@/routers";
import { CategoryConfig } from "@/types";

export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    title: "Chăm sóc da",
    url: `${CATEGORY_URL}/cham-soc-da`,
  },
  {
    title: "Trang điểm",
    url: `${CATEGORY_URL}/trang-diem`,
  },
  {
    title: "Chăm sóc tóc",
    url: `${CATEGORY_URL}/cham-soc-toc`,
  },
  {
    title: "Chăm sóc cơ thể",
    url: `${CATEGORY_URL}/cham-soc-co-the`,
  },
  {
    title: "Nước hoa",
    url: `${CATEGORY_URL}/nuoc-hoa`,
  },
  {
    title: "Chăm sóc môi",
    url: `${CATEGORY_URL}/cham-soc-moi`,
  },
];
