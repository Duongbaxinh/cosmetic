"use client";
import { useError } from "@/contexts/error.context";
import { statusOrderType } from "@/dashboard/interfaces";
import { useGetOrdersManageQuery, useUpdateStatusOrderManageMutation } from "@/redux/slices/manage/manageorder.api";
import { useGetAllOrderQuery } from "@/redux/slices/order.slice";
import { OrderProduct, OrderResponse, ShippingAddress } from "@/types";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import OrderDetailModal from "../../molecules/DetailOrder";
import { ContainerLayout } from "../../layouts/ContainerLayout";
import { Permissions } from "@/config/auth.config";

// Define OrderFormData type
interface OrderFormData {
    id: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    phone?: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    shipping_address: ShippingAddress;
    order_details: OrderProduct[];
    total_price: number;
}

export default function OrderPage() {

    const { data: orders, isLoading, error } = useGetOrdersManageQuery()
    const [updateStatusOrder] = useUpdateStatusOrderManageMutation()
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<OrderResponse[]>([])
    const [orderChangeStatus, setOrderChangeStatus] = useState<{ orderId: string, status: string }[]>([])

    const { handleError } = useError()

    const handleUpdateOrderStatus = ({ orderId, status }: { orderId: string; status: statusOrderType }) => {
        setOrderChangeStatus(prev => [...prev, { orderId, status }])
    };

    const handleSave = async ({ orderId, status }: {
        orderId: string; status: string
    }) => {
        try {
            await updateStatusOrder({ status: status, orderId: orderId }).unwrap()
            toast.success("Đơn hàng đã được cập nhật trạng thái")
        } catch (error) {
            handleError(error)
        }
    }
    // const
    const handleViewOrder = (orderId: string) => {
        setSelectedOrder(orderId);
    };

    const handleCloseDetail = () => {
        setSelectedOrder(null);
    };

    useEffect(() => {
        if (orders) {
            setOrderData([...orders])
        }
    }, [orders])
    const currentOrder = orderData ? orderData.find((order) => order.id === selectedOrder) : undefined;

    return (
        <ContainerLayout isPrivate authentication={Permissions.sell}>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">Quản lý đơn hàng</h1>

                {/* Order List Table */}
                <div className="w-full bg-white border border-purple-300 rounded">
                    <table className="w-full divide-y divide-gray-200 table-auto">
                        <thead className="bg-purple-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Mã đơn hàng</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Người gửi</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Địa chỉ giao hàng</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Số điện thoại</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Số lượng</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orderData && orderData.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                                        Không có đơn hàng nào.
                                    </td>
                                </tr>
                            ) : (
                                orderData &&
                                orderData.length > 0 &&
                                orderData.map((order) => (
                                    <>
                                        <tr key={order.id}>
                                            <td className="px-4 py-2">{order.id}</td>
                                            <td className="px-4 py-2">{order.user.username}</td>
                                            <td className="px-4 py-2">{order.shipping_address?.address}</td>
                                            <td className="px-4 py-2">{order.user.phone}</td>
                                            <td className="px-4 py-2">{order.order_details.reduce((sum, p) => sum + p.quantity, 0)}</td>
                                            <td className="px-4 py-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e: any) => handleUpdateOrderStatus({ orderId: order.id, status: e.target.value })}
                                                >
                                                    {/* {status.map((item) => (
                                                        <option key={item.status} value={item.status}>
                                                            {item.title}
                                                        </option>
                                                    ))} */}
                                                </select>
                                            </td>
                                            <td className="px-4 py-2 flex items-center gap-3">
                                                {currentOrder && selectedOrder === order.id ? (
                                                    <button onClick={handleCloseDetail}>
                                                        <IoCloseCircle size={20} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleViewOrder(order.id)}
                                                        className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700"
                                                    >
                                                        Detail
                                                    </button>
                                                )}
                                                {orderChangeStatus.flatMap((item) => item.orderId).includes(order.id) && (
                                                    <button
                                                        onClick={() => handleSave({ orderId: order.id, status: order.status })}
                                                        className="bg-green text-white py-1 px-2 rounded hover:bg-green-700"
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                        {currentOrder && selectedOrder === order.id && (
                                            <tr>
                                                <td colSpan={7}>
                                                    <OrderDetailModal order={currentOrder} />
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </ContainerLayout>
    );
}