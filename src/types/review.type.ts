import { UserProfileType } from "./auth.type";

export type ReviewPayload = {
  product_id: string;
  rate: number;
  content: string;
};

export type ReviewImagePayload = {
  review_id: string;
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
