interface Product {
  productName: string;
  linkProduct: string | null;
}

// Define message interface
interface Message {
  role: "user" | "ai" | "pending";
  content: string | Product[];
}
export const parseContent = (content: string): Message[] => {
  const parts = content.split(/####/);
  const message = parts[0].trim();
  let newProducts: Product[] = parts[1]
    ? parts[1]
        .split("- **")
        .slice(1)
        .map((item) => {
          const product = item.split("**");
          const productLink = product[product.length - 1].trim();
          const regex = /\[.*?\]\((https?:\/\/[^\)]+)\)/;
          const match = productLink.match(regex);
          const link = match ? match[1] : null;
          return {
            productName: product[0],
            linkProduct: link,
          };
        })
    : [];

  return [
    ...(message ? [{ role: "ai" as const, content: message }] : []),
    ...(newProducts.length > 0
      ? [{ role: "ai" as const, content: newProducts }]
      : []),
  ];
};
