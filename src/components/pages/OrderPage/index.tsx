"use client"
import { SearchIcon } from '@/assets/icons';
import IconButton from '@/components/atoms/IconButton';
import Input from '@/components/atoms/Input';
import Price from '@/components/atoms/Price';
import { ORDER_TABS } from '@/components/config/order.config';
import ContainerLayout from '@/layouts/ContainerLayout';
import SideBarDetail from '@/layouts/SideBarDetail';
import { useGetAllOrderQuery } from '@/redux/slices/order.slice';
import { PURCHASE_URL } from '@/routers';
import { OrderTabItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiMinus } from 'react-icons/bi';

function OrderPage() {
    const [status, setStatus] = useState<string>("")
    const [textSearch, setTextSearch] = useState<string>("")
    const { data, isLoading: loading, error } = useGetAllOrderQuery(status)
    const handleChangeStatus = (new_status: string) => {
        setStatus(new_status)
    }
    const orders = data || []
    const orderFilter = orders.filter(item =>
        item.id.toLowerCase().includes(textSearch.toLowerCase()) ||
        item.order_details.some(pro =>
            pro.product_name.toLowerCase().includes(textSearch.trim().toLowerCase())
        )
    )
    return (
        <ContainerLayout isSidebar={false} classHeader='sticky top-0 left-0 z-60'>
            <div className="flex gap-4 max-w-[1024px] mx-auto ">
                <SideBarDetail />
                <div className=" flex flex-col gap-5 space-x-5 max-w-[660px]  ">
                    <p className=' text-[19px] font-[700] '> Đơn hàng của tôi</p>
                    <div className=" bg-white  h-[42px] overflow-auto no-scrollbar  mr-0 flex items-center text-[14px] leading-4 text-gray-400 shadow inset-[5px] ">
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
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                        placeholder='Tìm đơn hàng theo mã đơn hàng, tên sản phẩm'
                        className='w-full bg-white h-[35px] border-0' />
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <h1>Loading...</h1>
                        ) : (
                            <>
                                {orderFilter && orderFilter.length > 0 ? orderFilter.map((order) => (
                                    <div key={order.id} className=" bg-white p-4 rounded-md border-b border-color  ">
                                        {order?.order_details.map((product) => (
                                            <div key={product.id} className="flex items-start justify-between">
                                                <div className="flex gap-3 py-2">
                                                    <Image
                                                        src={product.product_thumbnail ?? '/default-image.jpg'}
                                                        alt={product.product_name}
                                                        width={120}
                                                        height={120}
                                                        className="object-cover rounded-md w-[120px] h-[120px] shadow"
                                                    />
                                                    <div className="flex-1 space-y-3 text-[20px] text-black ">
                                                        <div className="line-clamp-2">{product.product_name}</div>
                                                        <div className="">SL: x{product.quantity}</div>
                                                        <div className="">
                                                            <Price product_price={product.product_price} className='!font-light text-red-400' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <IconButton icon={<BiMinus />} className='!bg-gray-300' />
                                            </div>
                                        ))}
                                        <div className='flex gap-2 w-full py-2 pr-[30px] items-center justify-between '>
                                            <div className="flex gap-2 items-center">
                                                <span>Thành tiền :</span> <Price product_price={order.total_price} className='text-red-400 text-[20px]' />
                                            </div>
                                            <Link href={`${PURCHASE_URL}/${order.id}`} className='flex gap-2 w-fit p-1 mb-2 items-center justify-start text-blue-400  '>Xem chi tiết</Link>
                                        </div>
                                    </div>
                                )) : (
                                    <p>Không tìm thấy đơn hàng nào.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}

export default OrderPage;