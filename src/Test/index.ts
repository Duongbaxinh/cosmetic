import axios from "axios";
import { isArray } from "lodash";

// Import the JSON file (Node.js style, use dynamic import for ES modules if needed)
const productDataArray = require("./data3.json"); // Adjust path to your JSON file

interface ProductFormData {
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
  images?: string[];
}

const createProductWithImages = async (
  productData: ProductFormData | ProductFormData[]
) => {
  try {
    // Normalize input to always handle an array
    const products = Array.isArray(productData) ? productData : [productData];

    // Filter out images from product data for product creation
    const dataFilter = products.map((product) => {
      const { images, ...productBody } = product;
      return productBody;
    });

    // Create products
    const createProductResponse = await axios.post(
      `https://joyboy-be.up.railway.app/products`,
      dataFilter,
      {
        headers: {
          Authorization: `Bearer b71jT9ip8y5NLBHcYLqXBaMyA8m1Wt`,
        },
      }
    );

    if (createProductResponse.data && isArray(createProductResponse.data)) {
      const productData =
        createProductResponse.data as unknown as ProductFormData[];
      // Handle image uploads for each product
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.images && product.images.length > 0) {
          const imagePayload = product.images.map((url) => ({
            product_id: productData[i].product_slug,
            image_url: url,
            alt_text: product.product_name,
          }));

          await axios.post(
            "https://joyboy-be.up.railway.app/product-images",
            imagePayload,
            {
              headers: {
                Authorization: `Bearer b71jT9ip8y5NLBHcYLqXBaMyA8m1Wt`,
              },
            }
          );
        }
      }
    }
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm hoặc ảnh:", error);
    throw error;
  }
};

// Call the function with the imported JSON data
createProductWithImages(productDataArray);
