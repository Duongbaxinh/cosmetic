"use client"
import Price from '@/components/atoms/Price';
import { PAYMENT_METHOD } from '@/consts';
import { useAuth } from '@/contexts/auth.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetProductOrder } from '@/services';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs';

function OrderDetailPage({ order_id }: { order_id: string }) {
    const auth = useAuth()
    const { orderDetail: order_detail, loading } = useGetProductOrder(order_id, true)
    const status_color = (type: any) => {
        return {
            'bg-green-500 text-white': type === 'success',
            'bg-blue-500 text-white': type === 'in_progress',
            'bg-gray-300 text-gray-700': type === 'delivering '
        }
    }
    const is_order = order_detail && order_detail.order && order_detail.order.order_products
    const discount_direct = order_detail?.order.order_discount ?? 0
    const discount_shipping = order_detail?.order.order_discount_shipping ?? 0

    return (
        <ContainerLayout isSidebar={false} isSidebarDetail={true}>
            <div className="px-8 lg:px-0 pb-8 mr-8">
                <h1 className=' py-5  text-[20px] leading-6 font-light'>Địa chỉ nhận hàng</h1>
                <div className='flex flex-col bg-white sm:flex-row rounded-md'>
                    <div className=" p-3 min-w-[280px] flex flex-col gap-2  text-[12px]  text-gray-300  border-r-1 border-gray-300 ">
                        <p className='text-[14px] leading-[22px] text-gray-400'>{auth?.user?.last_name} {auth?.user?.first_name}</p>
                        <p>{auth?.user?.phone}</p>
                        <p>{auth?.user?.address}</p>
                    </div>
                    <div className="w-full p-3  " >
                        <div className="px-8 w-full">
                            <div className="border-l-2 border-gray-300 pl-4 relative">
                                {order_detail?.order_tracking.map((item, idx) => (
                                    <div key={idx} className="mb-6 relative">
                                        {/* Icon */}
                                        <span className={clsx('w-6 h-6 rounded-full absolute -left-[30px] flex items-center justify-center', status_color(item.type))}>
                                            {item.type === 'success' ? <BiCheckCircle size={16} /> : <BsTruck size={16} />}
                                        </span>

                                        {/* Time */}
                                        <p className="text-sm text-gray-500">{item.time}</p>

                                        {/* Status */}
                                        {item.status && (
                                            <p
                                                className={clsx('font-semibold', {
                                                    'text-green-600': item.type === 'success',
                                                    'text-blue-600': item.type === 'in_progress'
                                                })}
                                            >
                                                {item.status}
                                            </p>
                                        )}

                                        {/* Detail */}
                                        <p className="text-gray-700">{item.detail}</p>

                                        {/* Optional image link */}
                                        {item.image && (
                                            <a href="#" className="text-sm text-blue-500 underline">
                                                {item.image}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRODUCT */}
                {is_order && (
                    <div className=" bg-white p-4 space-y-[20px] mt-[30px] rounded-md">
                        {order_detail?.order?.order_products.map((product, index) => (
                            <div key={product.product_id} className={`flex gap-3 pt-4 ${index !== 0 && "border-t border-gray-300"}`}>
                                <Image
                                    src={product.product_thumbnail}
                                    alt={product.product_name}
                                    width={50}
                                    height={70}
                                    className="object-cover w-[60px] h-[60px]"
                                />
                                <div className="flex-1">
                                    <div className="text-sm text-gray-800 line-clamp-2">{product.product_name}</div>
                                    <div className="text-xs text-gray-500">SL: x{product.product_quantity}</div>
                                    <div className="text-xs mt-1">
                                        <Price product_price={product.product_price_cost} className='!font-light  text-gray-400 line-through' />
                                        <Price product_price={product.product_price} className='!font-light text-red-400' />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="space-y-2 text-[14px] leading-[21px] text-gray-400 border-t pt-[20px]">
                            <div className="flex justify-between ">
                                <span className="text-gray-600">Phương thức thanh toán</span>
                                <span className="text-gray-600">{PAYMENT_METHOD[order_detail.order.order_payment_method]}</span>
                            </div>

                            <div className="flex justify-between ">
                                <span className="text-gray-600">Tổng tiền hàng</span>
                                <Price product_price={order_detail?.order?.order_total_price ?? 0} className='text-black !font-light' />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phí vận chuyển</span>
                                <Price product_price={order_detail?.order?.order_shipping ?? 0} className='text-black !font-light' />
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
                            <div className="flex justify-between border-t border-gray-300 pt-2">
                                <span className="text-gray-800 font-semibold">Tổng tiền hàng</span>
                                <Price product_price={order_detail?.order?.order_final_price ?? 0} className='text-red-400 text-[16px]' />
                            </div>
                            <div className="flex justify-between border-t border-gray-300 pt-2">
                                <span className="text-gray-800 font-semibold">Số tiền đã thanh toán</span>
                                <Price product_price={order_detail.order.order_amount_paid ?? 0} className='text-red-400 text-[16px]' />
                            </div>
                            <div className="flex justify-between border-t border-gray-300 pt-2">
                                <span className="text-gray-800 font-semibold">Số tiền cần thanh toán</span>
                                <Price product_price={order_detail?.order?.order_amount_rest ?? 0} className='text-red-400 text-[20px]' />
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </ContainerLayout>
    );
}

export default OrderDetailPage;