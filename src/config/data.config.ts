export const priceRanges = [
  { key: "under_500k", label: "Dưới 500.000₫", min: 0, max: 500000 },
  {
    key: "500k-1m",
    label: "500.000₫ > 1.000.000₫",
    min: 500000,
    max: 1000000,
  },
  {
    key: "1m_1,5m",
    label: "1.000.000₫ > 1.500.000₫",
    min: 1000000,
    max: 1500000,
  },
  {
    key: "1.5_2m",
    label: "1.500.000₫ > 2.000.000₫",
    min: 1500000,
    max: 2000000,
  },
  { key: "over_2m", label: "Trên 2.000.000₫", min: 2000000, max: "max" },
];

export const labelCategory = {
  top_sales: "Sản phẩm bán chạy",
  product_discount: "Sản phẩm giảm giá",
  product_international: "Hàng ngoại giá tốt",
  new_products: "Sản phẩm mới",
  product_brand: "Thương hiệu nổi bật",
};
