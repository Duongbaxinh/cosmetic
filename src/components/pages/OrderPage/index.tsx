"use client"
import { SearchIcon } from '@/assets/icons';
import Input from '@/components/atoms/Input';
import Price from '@/components/atoms/Price';
import { ORDER_TABS } from '@/components/config/order.config';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetAllOrderQuery } from '@/redux/slices/order.slice';
import { PURCHASE_URL } from '@/routers';
import { OrderTabItem } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

function OrderPage() {
    const [status, setStatus] = useState<string>("")

    const { data, isLoading: loading, error } = useGetAllOrderQuery(status)
    const handleChangeStatus = (new_status: string) => {
        setStatus(new_status)
    }

    console.log("check ***", data)
    const orders = data || []
    return (
        <ContainerLayout isSidebar={false} isSidebarDetail={true}>
            <div className="pt-[18px] flex flex-col gap-5 space-x-5 px-4  ">
                <p className=' text-[19px] font-[300] '> Đơn hàng của tôi</p>
                <div className=" bg-white  h-[42px] overflow-auto no-scrollbar  mr-0 flex items-center text-[14px] leading-4 text-gray-400 ">
                    {ORDER_TABS.map((tab: OrderTabItem, index) => (
                        <div key={index} className={`relative w-full min-w-[138px] px-2 h-full bg-white flex items-center justify-center whitespace-nowrap ${status === tab.status && "text-blue-600"}`}
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

                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {orders && orders.length > 0 && orders.map((order) => (
                                <div className=" bg-white p-4 rounded-md">
                                    <Link href={`${PURCHASE_URL}/${order.id}`} className='flex gap-2 w-fit p-1 mb-2 items-center justify-start text-blue-400  '>Xem chi tiết</Link>
                                    {order?.order_details.map((product) => (
                                        <div key={product.id} className="flex gap-3">
                                            {/* <Image
                                                src={product.product_name}
                                                alt={product.product_name}
                                                width={50}
                                                height={70}
                                                className="object-cover w-[60px] h-[60px]"
                                            /> */}
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-800 line-clamp-2">{product.product_name}</div>
                                                <div className="text-xs text-gray-500">SL: x{product.quantity}</div>
                                                <div className="text-xs mt-1">
                                                    {/* <Price product_price={product.product_price} className='!font-light  text-gray-400 line-through' /> */}
                                                    <Price product_price={product.product_price} className='!font-light text-red-400' />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex gap-2 w-full py-2 pr-[30px] items-center justify-start'><span>Thành tiền :</span> <Price product_price={order.total_price} className='text-red-400 text-[20px]' /></div>
                                </div>
                            ))}</>
                    )}
                </div>
            </div>
        </ContainerLayout>
    );
}

export default OrderPage;