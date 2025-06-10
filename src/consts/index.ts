export enum PAYMENT_METHOD {
  CASH = "Thanh toán khi nhận hàng",
  CARD = "Thanh toán qua thẻ",
}

export const status = [
  {
    status: "pending",
    title: "Đang chờ thanh toán",
  },
  {
    status: "confirmed",
    title: "Đã xác nhận đơn hàng",
  },
  {
    status: "prepared",
    title: "Đang chuẩn bị hàng",
  },
  {
    status: "shipping",
    title: "Đang giao hàng",
  },
  {
    status: "delivered",
    title: "Đã giao hàng",
  },
  {
    status: "cancelled",
    title: "Đã hủy đơn",
  },
  {
    status: "returned",
    title: "Đã hoàn trả",
  },
];

export * from "./layout";

export const comment =
  "Cảm ơn bạn đã dành thời gian đánh giá sản phẩm. JoyBoy rất vui khi biết bạn hài lòng với sản phẩm và dịch vụ của JoyBoy. Nếu có bất kỳ câu hỏi nào khác, vui lòng liên hệ với JoyBoy qua các kênh hỗ trợ của JoyBoy nhé. Chúc bạn một ngày vui vẻ!";
