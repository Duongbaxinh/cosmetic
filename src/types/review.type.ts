import { UserProfileType } from "./auth.type";

export type ReviewPayload = {
  product_id: string;
  order_detail_id: string;
  rate: number;
  content: string;
  image_reviews: ReviewImagePayload[];
};

export type ReviewImagePayload = {
  image: string;
};

export type ReviewResponse = {
  id: string;
  user: UserProfileType;
  rate: number;
  image_reviews: string[];
  created_at: string;
  updated_at: string;
};
