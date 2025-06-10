// Import the JSON file (Node.js CommonJS style)
const productDataArray = require("./formatted_product_data.json"); // Adjust the path if needed

type ProductFormData = {
  product_name: string;
  product_slug?: string;
  product_price: number;
  product_type_id?: string;
  product_made: string;
  product_discount: boolean;
  product_discount_percent: number;
  product_discount_start: string;
  product_discount_end: string;
  product_promotion_id: string | null;
  product_expiration_date: string;
  product_stock_quantity: number;
  product_description: string;
  product_ingredient: string;
  product_international: boolean;
  product_thumbnail: string;
  product_images?: string[];
};

type ProductFormData2 = {
  product_name: string;
  product_price: number;
  product_thumbnail: string;
  product_type_id: string;
  product_made: string;
  product_discount: boolean;
  product_discount_percent: number;
  product_discount_start: string | null;
  product_discount_end: string | null;
  product_promotion_id: string;
  product_international: boolean;
  product_description: string;
  product_ingredient: string;
  product_stock_quantity: number;
  product_expiration_date: string;
  product_slug?: string;
  product_images: {
    image_url: string;
    is_primary?: boolean;
  }[];
};

const createProductWithImages = async (
  productData: ProductFormData | ProductFormData[]
): Promise<void> => {
  try {
    const products = Array.isArray(productData) ? productData : [productData];

    const dataCreate: ProductFormData2[] = products.map((product) => {
      const { product_images, ...productBody } = product;
      const images =
        product_images?.map((img) => ({
          image_url: img,
          is_primary: true,
        })) || [];
      console.log("check ", images);
      return {
        ...productBody,
        product_images: images,
      } as ProductFormData2;
    });
    console.log("check ", dataCreate);

    const response = await fetch("https://joyboy-be.up.railway.app/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ly91l2hDT6fabtsL9VrG60BYueofnU`,
      },
      body: JSON.stringify(dataCreate),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Product creation result:", result);
  } catch (error) {
    console.error("❌ Error creating product or images:", error);
    throw error;
  }
};

// Call the function with the imported JSON data
createProductWithImages(productDataArray);
