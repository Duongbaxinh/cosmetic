"use client"
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Price from '@/components/atoms/Price';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useCreateOrderDetailMutation, useCreateOrderMutation, usePaymentOrderMutation } from '@/redux/slices/order.slice';
import { CHECKOUT_URL, ORDER_URL } from '@/routers';
import type { OrderCheckout, TCheckoutPage } from '@/types';
import moment from 'moment';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function CheckoutPage() {
    const [showDetail, setShowDetail] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState<"cash" | "momo">("cash")
    const [orderCheckout, setOrderCheckout] = useState<OrderCheckout | null>(null)
    const [createOrder] = useCreateOrderMutation();
    const [paymentOrder] = usePaymentOrderMutation();
    const [createOrderDetail] = useCreateOrderDetailMutation();

    const dispatch = useDispatch();
    // const { orderCheckout, loading } = useOrderCheckout(order_id, true)

    const handleShowDetail = () => {
        setShowDetail(!showDetail)
    }

    const handleConfirmOrder = async () => {
        if (!orderCheckout) return;
        alert("run order")
        const dataOrder = await createOrder(orderCheckout.order_shippingAddress.id)
        console.log("check create order ::: ", dataOrder)
        const dataOrderDetail = await createOrderDetail({
            order_id: dataOrder.data?.id ?? "",
            product_id: orderCheckout.order_products[0].id,
            quantity: orderCheckout.order_products[0].quantity,
        })
        if (paymentMethod === "momo" && dataOrder && dataOrder.data) {
            alert('pay order')
            const datPayment = await paymentOrder(dataOrder.data?.id)
            return redirect(datPayment.data?.payUrl ?? CHECKOUT_URL)
        }
        // console.log("check create dataOrderDetail ::: ", dataOrderDetail)
        // const payload = {
        //     order_id: orderCheckout.order_id
        // }
        // const result = await confirmOrder(payload, true)
        redirect(`${ORDER_URL}`)
    }

    useEffect(() => {
        const orderString = sessionStorage.getItem('order');
        // const shippingData = localStorage.getItem("shippingAddress");

        // if (shippingData) {
        //     dispatch(setShippingAddress(JSON.parse(shippingData)));
        // }
        if (orderString) {
            const orderStorage = JSON.parse(orderString);
            setOrderCheckout(orderStorage)
        }
    }, [])

    const totalPrice = orderCheckout?.order_products.reduce((sum, product) => {
        const price = product.product_price ?? 0;
        const quantity = product.quantity ?? 1;
        return sum + price * quantity;
    }, 0);
    !orderCheckout && <h1>ERROR</h1>

    const shipping = orderCheckout?.order_shipping ?? 0;
    const shippingDiscount = orderCheckout?.order_discount_shipping ?? 0;
    const discount = orderCheckout?.order_discount ?? 0
    const finalPrice = (totalPrice ?? 0) - discount - shippingDiscount + shipping;
    const text_detail = showDetail ? "Thu gọn" : "Xem chi tiết"

    console.log("check method :::: ", paymentMethod)
    return (
        <ContainerLayout isSidebar={false} >
            <div className="pb-3">
                <Breadcrumb items={[{ label: "Trang Chủ", href: "/" }, { label: "Thanh Toán", href: "#" }]} />
            </div>
            <div className="w-full p-4 min-h-screen">
                <div className='w-full flex flex-col md:flex-row gap-3'>
                    <div className="flex-grow rounded-md h-full ">
                        <div className=" bg-white shadow-md rounded-lg p-4 space-y-4">
                            <div className="flex items-center justify-between text-sm text-green-600 font-medium">
                                <p>Dự kiến giao hàng: {moment(orderCheckout?.order_expected_delivery_time).format("DD/MM/YYYY [lúc] HH:mm")}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {orderCheckout && orderCheckout?.order_products.map((product) => (
                                    <div key={product.id} className="flex gap-3">
                                        <Image
                                            src={product.product_thumbnail ?? null}
                                            alt={product.product_name}
                                            width={50}
                                            height={70}
                                            className="object-cover w-[60px] h-[60px]"
                                        />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-800">{product.product_name}</div>
                                            <div className="text-xs text-gray-500">SL: x{product.quantity}</div>
                                            <div className="text-xs mt-1">
                                                {/* <Price product_price={product.product_price_cost} className='!font-light  text-gray-400 line-through' /> */}
                                                <Price product_price={product.product_price} className='!font-light text-red-400' />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between text-sm font-medium">
                                <span>Phí vận chuyển</span>
                                <Price product_price={orderCheckout?.order_shipping ?? 0} className='!font-light  text-gray-400 ' />
                            </div>

                            {/* <div className="bg-gray-100 p-2 rounded-lg text-xs text-gray-600 flex items-center gap-2">
                                <span className="material-icons text-base">Nhập mã giảm giá</span>

                            </div> */}
                        </div>
                        <div className=" bg-white shadow-md rounded-lg p-4 space-y-4 mt-4">
                            <div className="flex items-center justify-between  font-medium">
                                <p className='text-[14px] font-bold '>Chọn hình thức thanh toán</p>
                            </div>
                            <div className="mt-5">
                                <div className="flex flex-col gap-5">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="cash"
                                            checked={paymentMethod === 'cash'}
                                            onChange={() => setPaymentMethod('cash')}
                                            className="mr-2"
                                        />
                                        <div className="flex items-center gap-2">
                                            <Image src="" alt="Receipt Payment" width={20} height={20} className="h-6" />
                                            <p>Thanh toán khi nhận hàng</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="momo"
                                            checked={paymentMethod === 'momo'}
                                            onChange={() => setPaymentMethod("momo")}
                                            className="mr-2"
                                        />
                                        <div className="flex items-center gap-2">
                                            <Image src="" alt="PayPal Payment" className="h-6" width={20} height={20} />
                                            <p>Thanh toán bằng MoMo                  </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sticky top-2 max-w-[320px] h-[100px] w-full space-y-3 ">
                        <div className="bg-white p-4 rounded-lg shadow-sm max-w-md">
                            <div>
                                <h3 className="text-gray-700 font-semibold">Giao tới</h3>
                                <p className="text-gray-700 text-[13px] line-clamp-1">{orderCheckout?.order_shippingAddress.address}</p>
                                <h3 className="text-gray-700 font-semibold">{orderCheckout?.order_user.user_name}</h3>
                                <button className="text-blue-600 text-sm hover:underline">Thay đổi</button>
                            </div>
                            <p className="text-gray-900 font-medium">{orderCheckout?.order_user.user_name} </p>
                            <p className="text-green-600 text-sm">{orderCheckout?.order_user.user_address} </p>
                        </div>
                        {/* CHECKOUT */}
                        <div className="bg-white p-4 rounded-lg shadow-sm max-w-md space-y-2">
                            <h2 className='font-bold'>Đơn hàng</h2>

                            <div className="text-[14px] leading-5 ">
                                <span className='text-gray-400'>{orderCheckout?.order_products.length} sản phẩm</span>
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
                                {orderCheckout?.order_products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex gap-3 items-center text-[12px] py-2"
                                    >
                                        <div className="text-gray-500 whitespace-nowrap">
                                            SL: x{product.quantity}
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
                                    <Price product_price={orderCheckout?.order_total_price ?? 0} className='text-black !font-light' />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phí vận chuyển</span>
                                    <Price product_price={orderCheckout?.order_shipping ?? 0} className='text-black !font-light' />
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giảm giá trực tiếp</span>
                                        <Price product_price={discount} className='text-black !font-light' />
                                    </div>
                                )}
                                {shippingDiscount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giảm giá vận chuyển</span>
                                        <Price product_price={shippingDiscount} className='text-black !font-light' />
                                    </div>
                                )}
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-gray-800 font-semibold">Tổng tiền thanh toán</span>
                                    <Price product_price={finalPrice} className='text-red-400 text-[20px]' />
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