export const createParams = (customParams: any) => ({
  limit: 10,
  page: 0,
  ...customParams,
});

export function toQueryString(params: any) {
  return Object.entries(params)
    .filter(([_, v]) => v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([key, val]) =>
      Array.isArray(val)
        ? `${key}=${val.join(",")}`
        : typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean"
        ? `${key}=${encodeURIComponent(val)}`
        : `${key}=`
    )
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
