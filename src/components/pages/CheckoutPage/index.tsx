"use client"
import Price from '@/components/atoms/Price';
import ContainerLayout from '@/layouts/ContainerLayout';
import { ORDER_URL } from '@/routers';
import { confirmOrder, useOrderCheckout } from '@/services';
import type { TCheckoutPage } from '@/types';
import moment from 'moment';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';

function CheckoutPage({ order_id }: TCheckoutPage) {
    const [showDetail, setShowDetail] = useState(false)
    const { order, loading } = useOrderCheckout(order_id, true)

    const handleShowDetail = () => {
        setShowDetail(!showDetail)
    }

    const handleConfirmOrder = async () => {
        if (!order || !order.order_id) return;
        const payload = {
            order_id: order.order_id
        }
        const result = await confirmOrder(payload, true)
        redirect(`${ORDER_URL}`)
    }
    if (loading) return <h1>Loading</h1>

    const text_detail = showDetail ? "Thu gọn" : "Xem chi tiết"
    const discount_direct = order?.order_discount ?? 0
    const discount_shipping = order?.order_discount_shipping ?? 0
    return (
        <ContainerLayout isSidebar={false} >
            <div className="w-full p-4">
                <div className='w-full flex flex-col md:flex-row gap-3'>
                    <div className="flex-grow bg-white  rounded-md h-full min-h-screen">
                        <div className="bg-white rounded-lg p-4 space-y-4">
                            <div className=" shadow-md rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between text-sm text-green-600 font-medium">
                                    <p>Dự kiến giao hàng: {moment(order?.order_expected_delivery_time).format("DD/MM/YYYY [lúc] HH:mm")}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {order && order?.order_products.map((product) => (
                                        <div key={product.product_id} className="flex gap-3">
                                            <Image
                                                src={product.product_thumbnail}
                                                alt={product.product_name}
                                                width={50}
                                                height={70}
                                                className="object-cover w-[60px] h-[60px]"
                                            />
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-800">{product.product_name}</div>
                                                <div className="text-xs text-gray-500">SL: x{product.product_quantity}</div>
                                                <div className="text-xs mt-1">
                                                    <Price product_price={product.product_price_cost} className='!font-light  text-gray-400 line-through' />
                                                    <Price product_price={product.product_price} className='!font-light text-red-400' />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between text-sm font-medium">
                                    <span>Phí vận chuyển</span>
                                    <Price product_price={order?.order_shipping ?? 0} className='!font-light  text-gray-400 ' />
                                </div>

                                <div className="bg-gray-100 p-2 rounded-lg text-xs text-gray-600 flex items-center gap-2">
                                    <span className="material-icons text-base">Nhập mã giảm giá</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sticky top-2 max-w-[320px] h-[100px] w-full space-y-3 ">
                        <div className="bg-white p-4 rounded-lg shadow-sm max-w-md">
                            <div className="flex justify-between items-center">
                                <h3 className="text-gray-700 font-semibold">Giao tới</h3>
                                <button className="text-blue-600 text-sm hover:underline">Thay đổi</button>
                            </div>
                            <p className="text-gray-900 font-medium">{order?.order_user.user_name} </p>
                            <p className="text-green-600 text-sm">{order?.order_user.user_address} </p>
                        </div>
                        {/* CHECKOUT */}
                        <div className="bg-white p-4 rounded-lg shadow-sm max-w-md space-y-2">
                            <h2 className='font-bold'>Đơn hàng</h2>

                            <div className="text-[14px] leading-5 ">
                                <span className='text-gray-400'>{order?.order_products.length} sản phẩm</span>
                                <span
                                    className='ml-1 text-blue-400 cursor-pointer'
                                    onClick={handleShowDetail}
                                >
                                    {text_detail}
                                </span>
                            </div>

                            <div
                                className={`overflow-auto transition-all duration-300 ease-in-out ${showDetail ? 'max-h-[500px]' : 'max-h-0'}`}
                            >
                                {order?.order_products.map((product) => (
                                    <div
                                        key={product.product_id}
                                        className="flex gap-3 items-center text-[12px] py-2"
                                    >
                                        <div className="text-gray-500 whitespace-nowrap">
                                            SL: x{product.product_quantity}
                                        </div>
                                        <div className="text-gray-800 line-clamp-2">
                                            {product.product_name}
                                        </div>
                                        <Price
                                            product_price={product.product_price}
                                            className="!font-light text-red-400"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 text-[14px] leading-[21px] text-gray-400">
                                <div className="flex justify-between ">
                                    <span className="text-gray-600">Tổng tiền hàng</span>
                                    <Price product_price={order?.order_total_price ?? 0} className='text-black !font-light' />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phí vận chuyển</span>
                                    <Price product_price={order?.order_shipping ?? 0} className='text-black !font-light' />
                                </div>
                                {discount_direct > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giảm giá trực tiếp</span>
                                        <Price product_price={discount_direct} className='text-black !font-light' />
                                    </div>
                                )}
                                {discount_shipping > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giảm giá vận chuyển</span>
                                        <Price product_price={discount_shipping} className='text-black !font-light' />
                                    </div>
                                )}
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-gray-800 font-semibold">Tổng tiền thanh toán</span>
                                    <Price product_price={order?.order_final_price ?? 0} className='text-red-400 text-[20px]' />
                                </div>
                            </div>
                            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                                onClick={() => handleConfirmOrder()}
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout >
    );
}

export default CheckoutPage;