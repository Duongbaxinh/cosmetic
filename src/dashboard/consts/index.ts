export * from "./product";
// Order
export const status = [
    {
        status: "pending",
        title: "Đang chờ thanh toán"
    },
    {
        status: "confirmed",
        title: "Đã xác nhận đơn hàng"
    },
    {
        status: "prepared",
        title: "Đang chuẩn bị hàng"
    },
    {
        status: "shipping",
        title: "Đang giao hàng"
    },
    {
        status: "delivered",
        title: "Đã giao hàng"
    },
    {
        status: "cancelled",
        title: "Đã hủy đơn"
    },
    {
        status: "returned",
        title: "Đã hoàn trả"
    }
];
