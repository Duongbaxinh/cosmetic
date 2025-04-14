"use client"
import { SearchIcon } from '@/assets/icons';
import Input from '@/components/atoms/Input';
import Price from '@/components/atoms/Price';
import { ORDER_TABS } from '@/components/config/order.config';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetOrder, useGetProductOrder } from '@/services';
import { OrderTabItem } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';

function OrderPage() {
    const [status, setStatus] = useState<string>("all")
    const { orders, loading } = useGetOrder(status, true)
    const handleChangeStatus = (new_status: string) => {
        setStatus(new_status)
    }
    if (loading) return <h1>Loading...</h1>
    return (
        <ContainerLayout isSidebar={false} isSidebarDetail={true}>
            <div className="pt-[18px] flex flex-col gap-5 space-x-5 px-4 md:mr-[36px] ">
                <p className=' text-[19px] font-[300] '> Đơn hàng của tôi</p>
                <div className=" bg-white  h-[42px] overflow-auto no-scrollbar  mr-0 flex items-center text-[14px] leading-4 text-gray-400 ">
                    {ORDER_TABS.map((tab: OrderTabItem, index) => (
                        <div key={index} className={`relative w-[158px] px-2 h-full bg-white flex items-center justify-center whitespace-nowrap ${status === tab.status && "text-blue-600"}`}
                            onClick={() => handleChangeStatus(tab.status)}>
                            {tab.title}
                            {status === tab.status && <div className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600" />}
                        </div>
                    ))}
                </div>
                <Input
                    leadingIcon={<SearchIcon />}
                    tailIcon={<p className='text-[14px] text-blue-400 font-light whitespace-nowrap border-l-2 pl-2'>Tìm đơn hàng</p>}
                    placeholder='Tìm đơn hàng theo mã đơn hàng, tên sản phẩm'
                    className='w-full bg-white h-[35px] border-0' />

                <div className="flex flex-col gap-4">
                    {orders && orders.length > 0 && orders.map((order) => (
                        <div className=" bg-white p-4 rounded-md">
                            {order?.order_products.map((product) => (
                                <div key={product.product_id} className="flex gap-3">
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
                            <div className='flex gap-2 w-full py-2 pr-[30px] items-center justify-start'><span>Thành tiền :</span> <Price product_price={order?.order_final_price ?? 0} className='text-red-400 text-[20px]' /></div>
                        </div>
                    ))}
                </div>
            </div>
        </ContainerLayout>
    );
}

export default OrderPage;