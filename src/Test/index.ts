import axios from "axios";

interface CreateProductPayload {
  product_name: string;
  product_price: number;
  product_thumbnail: string;
  //   product_type_id: string;
  //   product_brand_id: string;
  //   product_category_id: string;
  product_made: string;
  product_discount: number;
  //   product_discount_percent: number | null;
  product_discount_start: string | null;
  product_discount_end: string | null;
  product_promotion_id: string | null;
  product_sold: number;
  product_international: boolean;
  product_rate: number;
  product_ingredient: string;
  product_stock_quantity: number;
  product_expiration_date: string | null;
  product_images: string[];
}

const createProductWithImages = async (productData: CreateProductPayload) => {
  try {
    const { product_images, ...productBody } = productData;

    const createProductResponse = await axios.post(
      `https://joyboybe-production.up.railway.app/products`,
      productBody,
      {
        headers: {
          Authorization: `Bearer AKVlALtnZ1jWtgXubBTT6NOJgfueB7`,
        },
      }
    );
    if (createProductResponse.data) {
      const imagePayload = product_images.map((url, index) => ({
        product_id: productData.product_name,
        image_url: url,
        alt_text: productData.product_name,
      }));
      await axios.post(
        "https://joyboybe-production.up.railway.app/product-images",
        imagePayload,
        {
          headers: {
            Authorization: `Bearer AKVlALtnZ1jWtgXubBTT6NOJgfueB7`,
          },
        }
      );

      console.log("Tạo sản phẩm và ảnh thành công");
    }
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm hoặc ảnh:", error);
  }
};

const dataTest: CreateProductPayload = {
  product_name: "Son Thỏi Lì THE FACE SHOP Fmgt New Bold Velvet Lipstick 7.5g",
  product_price: 25000,
  product_thumbnail:
    "https://image.hsv-tech.io/600x600/bbx/common/ec82968b-50fc-4625-ae04-837ca98b03a4.webp",
  product_made: "South Korea",
  product_discount: 0,
  product_discount_start: null,
  product_discount_end: null,
  product_promotion_id: "Giảm 50%",
  product_sold: 280,
  product_images: [
    "https://image.hsv-tech.io/600x600/bbx/common/ec82968b-50fc-4625-ae04-837ca98b03a4.webp",
  ],
  product_international: true,
  product_rate: 5.0,
  product_ingredient: "Dimethicone, Shea Butter, Pigments, Beeswax, Tocopherol",
  product_stock_quantity: 100,
  product_expiration_date: null,
};
createProductWithImages(dataTest);
