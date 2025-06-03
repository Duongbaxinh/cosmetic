import axios from "axios";

interface ProductFormData {
  product_name: string;
  product_price: number;
  product_type: string;
  product_brand: string;
  product_made: string;
  product_discount: boolean;
  product_discount_percent: number;
  product_discount_start: string;
  product_discount_end: string;
  product_promotion_id: string;
  product_expiration_date: string;
  product_stock_quantity: number;
  product_description: string;
  product_ingredient: string;
  product_international: boolean;
  product_thumbnail: string;
}

const createProductWithImages = async (productData: ProductFormData[]) => {
  try {
    const dataFilter = productData.map((product) => {
      const { ...productBody } = product;
      return productBody;
    });

    const createProductResponse = await axios.post(
      `https://joyboybe-production.up.railway.app/products`,
      dataFilter,
      {
        headers: {
          Authorization: `Bearer Pvso7TXTm0hL77yNtxL0n7fK27xI5k`,
        },
      }
    );
    if (createProductResponse.data) {
      // const imagePayload = product_images.map((url, index) => ({
      //   product_id: productData.product_name,
      //   image_url: url,
      //   alt_text: productData.product_name,
      // }));
      // await axios.post(
      //   "https://joyboybe-production.up.railway.app/product-images",
      //   imagePayload,
      //   {
      //     headers: {
      //       Authorization: `Bearer AKVlALtnZ1jWtgXubBTT6NOJgfueB7`,
      //     },
      //   }
      // );

      console.log("Tạo sản phẩm và ảnh thành công");
    }
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm hoặc ảnh:", error);
  }
};

const rawProducts: ProductFormData[] = [
  {
    product_brand: "THE WHOO",
    product_description: "Quis natus modi qui ",
    product_discount: false,
    product_discount_end: "2017-05-08",
    product_discount_percent: 43,
    product_discount_start: "2003-12-19",
    product_expiration_date: "1977-01-28",
    product_ingredient: "Labore dolor cillum ",
    product_international: false,
    product_made: "Unde exercitationem ",
    product_name: "Shafira Cervantes",
    product_price: 5680000,
    product_promotion_id: "Giảm 40%",
    product_stock_quantity: 83,
    product_thumbnail:
      "https://res.cloudinary.com/dwu92ycra/image/upload/v1748920473/JOYBOY/u8gydvcegxymve3v2waj.webp",
    product_type: "Tẩy tế bào chết cơ thể",
  },
  {
    product_brand: "OBBAGI",
    product_description: "Fuga Totam qui odit",
    product_discount: false,
    product_discount_end: "",
    product_discount_percent: 0,
    product_discount_start: "",
    product_expiration_date: "1982-05-13",
    product_ingredient: "Eos alias incididunt",
    product_international: true,
    product_made: "Duis ipsum esse ut",
    product_name: "Liberty Velez",
    product_price: 20000,
    product_promotion_id: "Giảm 50%",
    product_stock_quantity: 576,
    product_thumbnail:
      "https://res.cloudinary.com/dwu92ycra/image/upload/v1748920473/JOYBOY/u8gydvcegxymve3v2waj.webp",
    product_type: "Son Thỏi",
  },
];
createProductWithImages(rawProducts);
