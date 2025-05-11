import { ReviewItem } from "@/types";

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
