import { Product, ProductDiscount, ReviewItem } from "@/types";

interface RatingCount {
  stars: number;
  count: number;
  percentage: string;
}

export const calculateRating = (reviews: ReviewItem[]): RatingCount[] => {
  const counts = Array(5).fill(0);
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      counts[5 - review.rating]++;
    }
  });

  const totalReviews = reviews.length;
  return [5, 4, 3, 2, 1].map((stars, index) => ({
    stars,
    count: counts[index],
    percentage:
      totalReviews > 0
        ? ((counts[index] / totalReviews) * 100).toFixed(2)
        : "0.00",
  }));
};

export const calculateDiscount = (product: Product): ProductDiscount => {
  const discountPromotion =
    product &&
    product.product_promotion &&
    product.product_promotion.discount_percent
      ? product.product_promotion.discount_percent
      : 0;
  const discountDirect =
    product && product.product_discount && product.product_discount_percent
      ? product.product_discount_percent
      : 0;

  return {
    discountDirect,
    discountPromotion,
    discountTitle: product.product_promotion?.title ?? "",
  };
};
