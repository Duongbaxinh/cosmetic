import { FilterProductType } from "@/types";
import { isArray } from "lodash";

export const createParams = (customParams: any) => ({
  limitnumber: 10,
  page: 1,
  ...customParams,
});

export function toQueryString(params: any) {
  return Object.entries(params)
    .filter(([_, v]) => v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        return `${key}=${val.join(",")}`;
      } else if (key === "product_promotion") {
        // Đặc biệt: KHÔNG encode cho `product_promotion`
        return `${key}=${val}`; // Giữ nguyên giá trị gốc
      } else if (
        typeof val === "string" ||
        typeof val === "number" ||
        typeof val === "boolean"
      ) {
        // Các trường hợp khác vẫn encode bình thường
        return `${key}=${encodeURIComponent(val)}`;
      } else {
        return `${key}=`;
      }
    })
    .join("&");
}

export const query = toQueryString({
  limitnumber: 30,
  page: 1,
  brand: [],
  category: "",
  price: [],
  rate: 5,
  order: "asc",
  sortBy: "",
});

export const cleanFilter = (filter: any) => {
  const newFilter: { [key: string]: any } = {};
  for (const filed in filter) {
    if (filed === "vendor") {
      console.log("check vendor :::: ", filter["vendor"].value);
      newFilter["vendor"] = filter["vendor"]?.value;
    } else if (filed === "price") {
      newFilter["price"] = filter["price"]?.value;
    } else if (isArray(filter[filed as keyof FilterProductType])) {
      newFilter[filed] = filter[filed].map((item: any) => item.value);
    } else {
      newFilter[filed] = filter[filed as keyof FilterProductType];
    }
  }
  return newFilter;
};
