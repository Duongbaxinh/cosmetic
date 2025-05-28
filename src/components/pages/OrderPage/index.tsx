"use client";
import { SearchIcon } from '@/assets/icons';
import IconButton from '@/components/atoms/IconButton';
import Input from '@/components/atoms/Input';
import Price from '@/components/atoms/Price';
import { ORDER_TABS } from '@/components/config/order.config';
import ContainerLayout from '@/layouts/ContainerLayout';
import SideBarDetail from '@/layouts/SideBarDetail';
import { useCancelOrderMutation, useGetAllOrderQuery } from '@/redux/slices/order.slice';
import { PURCHASE_URL } from '@/routers';
import { OrderTabItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiMinus } from 'react-icons/bi';
import LoadingPage from '../LoadingPage';
import ContainerAuth from '@/components/atoms/ContainerAuth';
import { toast } from 'react-toastify';

function OrderPage() {
    const [status, setStatus] = useState<string>("");
    const [textSearch, setTextSearch] = useState<string>("");
    const { data, isLoading: loading, error } = useGetAllOrderQuery(status);
    const [cancelOrder] = useCancelOrderMutation();
    const handleChangeStatus = (new_status: string) => {
        setStatus(new_status);
    };
    const orders = data || [];
    const orderFilter = orders.filter(item =>
        item.id.toLowerCase().includes(textSearch.toLowerCase()) ||
        item.order_details.some(pro =>
            pro.product_name.toLowerCase().includes(textSearch.trim().toLowerCase())
        )
    );
    const handleCancelOrder = async (orderId: string) => {
        try {
            await cancelOrder({ status: "cancel", orderId }).unwrap();
        } catch (error) {
            toast.error("Hủy đơn hàng không thành công. Vui lòng thử lại sau.");
        }
    };
    return (
        <ContainerLayout isPrivate={true} classHeader="sticky top-0 left-0 z-40 bg-pink-50">
            <ContainerAuth>
                <SideBarDetail />
                <div className="flex flex-col gap-5 w-full overflow-hidden">
                    <p className="text-[19px] font-[700] text-gray-900">Đơn hàng của tôi</p>
                    <div className="bg-white h-[42px] overflow-auto no-scrollbar flex items-center text-[14px] leading-4 text-gray-500 shadow-sm rounded-lg">
                        {ORDER_TABS.map((tab: OrderTabItem, index) => (
                            <div
                                key={index}
                                className={`relative w-full min-w-[138px] px-2 h-full flex items-center justify-center whitespace-nowrap cursor-pointer transition-colors duration-200 ${status === tab.status ? "text-pink-600 bg-pink-100" : "hover:bg-pink-50"
                                    }`}
                                onClick={() => handleChangeStatus(tab.status)}
                            >
                                {tab.title}
                                {status === tab.status && (
                                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-pink-600" />
                                )}
                            </div>
                        ))}
                    </div>
                    <Input
                        leadingIcon={<SearchIcon />}
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                        placeholder="Tìm đơn hàng theo mã đơn hàng, tên sản phẩm"
                        className="w-full bg-white h-[35px] border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
                    />
                    <div className="w-full flex flex-col gap-4 max-h-[80vh] overflow-auto">
                        {loading ? (
                            <LoadingPage className="w-full h-[150px]" />
                        ) : (
                            <>
                                {orderFilter && orderFilter.length > 0 ? (
                                    orderFilter.map((order) => (
                                        <div
                                            key={order.id}
                                            className="bg-white text-[12px] sm:text-auto p-[5px] sm:p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 "
                                        >
                                            {order?.order_details.map((product) => (
                                                <div key={product.id} className="flex items-start justify-between py-1 sm:py-2">
                                                    <div className="flex gap-3">
                                                        <Image
                                                            src={product.product_thumbnail ?? '/default-image.jpg'}
                                                            alt={product.product_name}
                                                            width={120}
                                                            height={120}
                                                            className="object-cover rounded-md w-[80px] sm:w-[120px] h-[80px] sm:h-[120px] shadow-sm"
                                                        />
                                                        <div className="flex-1 space-y-2 text-gray-900">
                                                            <div className="line-clamp-2 text-[12px] sm:text-sm font-medium">
                                                                {product.product_name}
                                                            </div>
                                                            <div className="text-[12px] sm:text-sm">SL: x{product.quantity}</div>
                                                            <div>
                                                                <Price
                                                                    product_price={product.product_price}
                                                                    className="text-[12px] sm:text-sm text-pink-600 font-light"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <IconButton
                                                        icon={<BiMinus />}
                                                        onClick={() => handleCancelOrder(order.id)}
                                                        className="bg-gray-200 mt-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                                                    />
                                                </div>
                                            ))}
                                            <div className="flex gap-2 w-full py-0 sm:py-2 items-center justify-between">
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-gray-900">Thành tiền:</span>
                                                    <Price
                                                        product_price={order.total_price}
                                                        className=" text-pink-600 text-[12px] sm:text-[20px]"
                                                    />
                                                </div>
                                                <Link
                                                    href={`${PURCHASE_URL}/${order.id}`}
                                                    className="flex gap-2 w-fit p-1 items-center justify-start text-purple-500 hover:text-purple-600 transition-colors duration-200"
                                                >
                                                    Xem chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">Không tìm thấy đơn hàng nào.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </ContainerAuth>
        </ContainerLayout>
    );
}

export default OrderPage;