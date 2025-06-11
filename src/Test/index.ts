// Import the JSON file (Node.js CommonJS style)
const productDataArray = require("./data_3.json"); // Adjust the path if needed

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

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const { product_images, ...productBody } = product;

      const images =
        product_images?.map((img) => ({
          image_url: img,
          is_primary: true,
        })) || [];

      const productToSend: ProductFormData2 = {
        ...productBody,
        product_images: images,
      } as ProductFormData2;

      try {
        const response = await fetch(
          "https://joyboy-be.up.railway.app/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer gNruxEqgAiGsDby52kVSWAjRFWA6xS`,
            },
            body: JSON.stringify(productToSend),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Product ${i + 1} failed:`, product.product_name);
          console.error(
            `   ➤ Status: ${response.status}, Message: ${errorText}`
          );
        } else {
          const result = await response.json();
          console.log(`✅ Product ${i + 1} created:`, result);
        }
      } catch (innerError) {
        console.error(
          `❌ Product ${i + 1} threw an exception:`,
          product.product_name
        );
        console.error("   ➤ Error:", innerError);
      }
    }
  } catch (error) {
    console.error("❌ Unexpected error in createProductWithImages:", error);
    throw error;
  }
};

// Call the function with the imported JSON data
createProductWithImages(productDataArray);
