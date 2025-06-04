import { CATEGORY_URL, DISCOUNT_PRODUCT_URL, TOP_PRODUCT_URL } from "@/routers";
import { CategoryConfig } from "@/types";

export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    title: "Chăm sóc da",
    url: `#`,
    slug: "duong-da",
    images: [
      "/images/sua_r_mat.webp",
      "/images/sua_r_mat_2.webp",
      "/images/sua_r_mat_3.webp",
    ],
    id: "category",
  },
  {
    title: "Chăm sóc tóc",
    url: `#`,
    slug: "cham-soc-toc",
    images: ["/images/toc_1.webp", "/images/toc_2.webp", "/images/toc_3.webp"],
    id: "category",
  },
  {
    title: "Trang điểm",
    url: `#`,
    slug: "trang-iem",
    images: [
      "/images/cham_soc_da.webp",
      "/images/cham_soc_da_2.webp",
      "/images/cham_soc_da_3.webp",
    ],
    id: "category",
  },
  {
    title: "Nước Hoa",
    url: `#`,
    slug: "nuoc-hoa",
    images: [
      "/images/nuoc_hoa.webp",
      "/images/nuoc_hoa_1.webp",
      "/images/nuoc_hoa_2.webp",
    ],
    id: "category",
  },
  {
    title: "Khuyến mãi hot",
    url: `${DISCOUNT_PRODUCT_URL}`,
    slug: "",
    images: [],
    id: 5,
  },
  {
    title: "Thương hiệu",
    url: `#`,
    slug: "brand",
    images: ["/images/clio.webp", "/images/amuse.webp"],
    id: "brand",
  },
  {
    title: "Sản phẩm mới",
    url: `${CATEGORY_URL}/product_new/true`,
    slug: "",
    images: [],
    id: 7,
  },
  {
    title: "Sản phẩm bán chạy",
    url: `${TOP_PRODUCT_URL}`,
    slug: "",
    images: [],
    id: 8,
  },
  {
    title: "Chương trình ưu đãi",
    url: `#`,
    slug: "promotion",
    images: ["/images/promotion.webp"],
    id: "promotion",
  },
];
