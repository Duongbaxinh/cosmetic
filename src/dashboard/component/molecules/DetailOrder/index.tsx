
import { OrderResponse } from "@/types";
import Image from "next/image";

interface OrderDetailModalProps {
    order: OrderResponse;
}

const OrderDetailModal = ({ order }: OrderDetailModalProps) => {
    return (
        <div className="inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg border border-purple-300 w-full max-w-2xl">
                <h2 className="text-lg font-semibold mb-4 text-purple-800">Chi tiết đơn hàng: {order.id}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Read-only Information */}
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            Người gửi: <span className="font-normal">{order.user.username}</span>
                        </p>
                    </div>
                    {/* Status and Phone */}
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                {/* Số điện thoại: <span className="font-normal">{order?.phone || "093023230"}</span> */}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Trạng thái: <span className="font-normal">
                                    {order.status === "pending" && "Chờ xử lý"}
                                    {order.status === "prepared" && "Đang xử lý"}
                                    {order.status === "shipping" && "Đã giao"}
                                    {order.status === "delivered" && "Giao thành công"}
                                    {order.status === "cancelled" && "Đã hủy"}
                                </span>
                            </p>
                        </div>
                    </div>
                    {/* Shipping Address */}
                    <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-700 mb-2">Địa chỉ giao hàng: {order.shipping_address?.address}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-700">
                                    Mã bưu điện: <span className="font-normal">{order.shipping_address?.address}</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Thành phố: <span className="font-normal">{order.shipping_address?.city}</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Quốc gia: <span className="font-normal">{order.shipping_address?.country}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Product Details */}
                    <div className="col-span-2">
                        <h3 className="text-md font-medium mb-2 text-purple-800">Chi tiết sản phẩm</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-purple-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Tên sản phẩm</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Hình ảnh</th>
                                        {/* <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Loại</th> */}
                                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Giá</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.order_details.map((orderDetail) => (
                                        <tr key={orderDetail.id}>
                                            <td className="px-4 py-2 whitespace-nowrap">{orderDetail.product.product_name}</td>
                                            <td className="px-4 py-2 whitespace-nowrap"><Image src={orderDetail.product.product_thumbnail && orderDetail.product.product_thumbnail.startsWith("http") ? orderDetail.product.product_thumbnail : "/images/denineImage.png"}
                                                alt="" width={40} height={40} /></td>
                                            <td className="px-4 py-2 whitespace-nowrap">{orderDetail.product.product_price.toLocaleString()} VNĐ</td>
                                            <td className="px-4 py-2 whitespace-nowrap">{orderDetail.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Totals and Dates */}
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            Tổng giá: <span className="font-normal">{order.order_details.reduce((sum, orderDetail) => sum + orderDetail.product.product_price * orderDetail.quantity, 0).toLocaleString()} VNĐ</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-sm text-gray-700">
                            Ngày tạo: <span className="font-normal">{new Date(order.created_at).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</span>
                        </p>
                        <p className="text-sm text-gray-700">
                            Cập nhật lần cuối: <span className="font-normal">{new Date(order.updated_at).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetailModal;