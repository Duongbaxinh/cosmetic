export type PaymentType = {
  order_id: string;
  trans_id: string;
  payment_method: "momo" | "zalopay";
};

export type PaymentResponse = {
  id: string;
  order: string;
  payment_method: "momo" | "zalo";
  status: "pending" | "paid" | "failed";
  trans_id: string;
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
};

export type MomoPaymentResponse = {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
};
