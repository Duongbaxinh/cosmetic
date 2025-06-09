"use client"
import CloseIcon from '@/assets/icons/CloseIcon';
import Breadcrumb from '@/components/atoms/Breadcrumb';
import IconButton from '@/components/atoms/IconButton';
import Price from '@/components/atoms/Price';
import CardProductFull from '@/components/molecules/CardProductFull';
import NotFound from '@/components/molecules/NotFound';
import GroupStart from '@/components/organisms/GroupStart';
import { MESS_SYSTEM } from '@/config/mess.config';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useCreateOrderDetailMutation, useCreateOrderMutation, useCreatePaymentMutation, usePaymentOrderMutation } from '@/redux/slices/order.slice';
import { useGetAllProductsQuery } from '@/redux/slices/product.slice';
import { CHECKOUT_URL, DETAIL_PRODUCT_URL, ORDER_URL } from '@/routers';
import { PaymentType, ShippingAddress, type OrderCheckout, type Product } from '@/types';
import { handleError } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BiChevronUp, BiMinus, BiPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import LoadingPage from '../LoadingPage';
import LoadingIcon from '../LoadingPage/LoadingIcon';
import { useAuth } from '@/contexts/auth.context';
import useSaveLocalStorage from '@/hooks/useLocalstorage';
import PopupShippingAddress from '@/components/organisms/PopupShippingAddress';
import { mapOrderProductsToOrderDetails } from '@/utils/mapper/mapOrderProductsToOrderDetails';
import { useCart } from '@/contexts/cart.context';

function CheckoutPage() {
    const { shippingAddress } = useAuth()
    const { removeMultiProductInCart } = useCart()
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "momo" | "zalopay">("cash")
    const [orderCheckout, setOrderCheckout] = useState<OrderCheckout | null>(null)
    const [createOrder] = useCreateOrderMutation();
    const [paymentOrder] = usePaymentOrderMutation();
    const [createOrderDetail, { isLoading: loadingCreateOrder, error: errorCreateOrder }] = useCreateOrderDetailMutation();
    const [createPayment] = useCreatePaymentMutation();
    const [show, setShow] = useState(false)
    const [isChangeShipping, setIsChangeShipping] = useState<boolean>(false)
    const [shippingOrder, setShippingOrder] = useSaveLocalStorage("shippingOrder", null)
    const { data: productAddition, error, isLoading: loading } = useGetAllProductsQuery({ limitnumber: 20, page: 1, product_international: true })

    const router = useRouter()

    const handleIncrease = (product_id: string) => {
        const orderString = sessionStorage.getItem('order');
        if (orderString) {
            let orderProduct = orderCheckout?.order_products ?? []
            const checkProductInOrder = orderProduct.find(item => item.id === product_id)

            if (checkProductInOrder) {
                orderProduct = orderProduct.map(item =>
                    item.id === checkProductInOrder.id ?
                        { ...checkProductInOrder, quantity: (checkProductInOrder.quantity + 1) }
                        : item)
            }

            if (orderCheckout) {
                setOrderCheckout({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                });
                sessionStorage.setItem(`order`, JSON.stringify({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                }))
                getOrder()
            }
        }
    }

    const handleDecrease = (product_id: string) => {
        const orderString = sessionStorage.getItem('order');
        if (orderString) {
            let orderProduct = orderCheckout?.order_products ?? []
            const checkProductInOrder = orderProduct.find(item => item.id === product_id)
            if (checkProductInOrder?.quantity === 1) {
                const confirm = window.confirm("Bạn muốn xóa sản phẩm ra khỏi đơn hàng")
                if (confirm) {
                    handleRemoveProduct(product_id)
                }
                return
            }
            if (checkProductInOrder) {
                orderProduct = orderProduct.map(item =>
                    item.id === checkProductInOrder.id ?
                        { ...checkProductInOrder, quantity: (checkProductInOrder.quantity - 1) }
                        : item)
            }

            if (orderCheckout) {
                setOrderCheckout({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                });
                sessionStorage.setItem(`order`, JSON.stringify({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                }))
                getOrder()
            }
        }
    }

    const handleAddProduct = (product: Product) => {
        const orderString = sessionStorage.getItem('order');
        if (orderString) {
            let orderProduct = orderCheckout?.order_products ?? []
            const checkProductInOrder = orderProduct.find(item => item.id === product.id)

            if (checkProductInOrder) {
                orderProduct = orderProduct.map(item =>
                    item.id === checkProductInOrder.id ?
                        { ...checkProductInOrder, quantity: (checkProductInOrder.quantity + 1) }
                        : item)
            } else {
                const newProduct = {
                    product_name: product.product_name,
                    id: product.id,
                    product_price: product.product_price,
                    product_thumbnail: product.product_thumbnail,
                    product_type: product.product_type?.slug ?? "",
                    product_brand: product.product_vendor.name,
                    quantity: 1,

                }
                orderProduct.push(newProduct)
            }
            if (orderCheckout) {
                setOrderCheckout({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                });
                sessionStorage.setItem(`order`, JSON.stringify({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                }))
                getOrder()
            }
        }
    }

    const handleRemoveProduct = (product_id: string) => {
        // Lấy order tạm ở sessionStorage với name order
        const orderString = sessionStorage.getItem('order');
        if (orderString) {
            let orderProduct = orderCheckout?.order_products ?? []
            const checkProductInOrder = orderProduct.find(item => item.id === product_id)
            if (checkProductInOrder) {
                orderProduct = orderProduct.filter(item => item.id !== product_id)
            }
            if (orderCheckout) {
                setOrderCheckout({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                });
                sessionStorage.setItem(`order`, JSON.stringify({
                    ...orderCheckout,
                    order_products: orderProduct ?? orderCheckout.order_products,
                    order_id: orderCheckout.order_id ?? "",
                }))
                getOrder()
            }
        }
    }

    // Xử lý đặt hàng
    const handleConfirmOrder = async () => {
        try {
            if (!orderCheckout) return;
            // Tạo đơn hàng
            const dataOrder = await createOrder(orderCheckout.order_shippingAddress.id)

            // Map dữ liệu sang dạng đơn hàng payload
            const orderDetailProduct = mapOrderProductsToOrderDetails(
                orderCheckout.order_products,
                dataOrder.data?.id ?? ""
            );

            // Tạo order detail
            const orderDetailRes = await createOrderDetail(orderDetailProduct)
            console.log("b1 ::", orderDetailRes)
            if ("error" in orderDetailRes) {
                return handleError(orderDetailRes.error)
            }

            const cartDetailIds = JSON.parse(sessionStorage.getItem("cartDetailIds") || "[]")
            // Xóa các sản phẩm trong giỏ hàng nếu có
            if (cartDetailIds.length > 0) {
                await removeMultiProductInCart(cartDetailIds)
                sessionStorage.setItem("cartDetailIds", JSON.stringify([]))
            }
            // Xử lý thanh toán với MoMo
            if (paymentMethod === "momo" && dataOrder && dataOrder.data) {
                const dataPayment = await paymentOrder({ orderId: dataOrder.data?.id, paymentMethod: "momo" }) as { data?: { requestId?: string; payUrl?: string } }
                if (!dataPayment || !dataPayment.data || !dataPayment.data.requestId) return toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
                const payloadMoMo: PaymentType = {
                    order_id: dataOrder.data.id,
                    payment_method: "momo",
                    trans_id: dataPayment.data.requestId,
                }
                const data_payment = await createPayment(payloadMoMo)
                if (data_payment.error) {
                    return handleError(data_payment.error)
                }
                return router.replace(dataPayment.data?.payUrl ?? CHECKOUT_URL)
            }

            // Xử lý thanh toán với ZaloPay
            if (paymentMethod === "zalopay" && dataOrder && dataOrder.data) {
                const dataPayment = await paymentOrder({ orderId: dataOrder.data?.id, paymentMethod: 'zalopay' }) as { data?: { trans_id?: string; url?: string } }

                if (!dataPayment || !dataPayment.data || !dataPayment.data.trans_id) return toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
                const payloadZaloPay: PaymentType = {
                    order_id: dataOrder.data.id,
                    payment_method: "zalopay",
                    trans_id: dataPayment.data.trans_id,
                }
                await createPayment(payloadZaloPay)
                return router.replace(dataPayment.data?.url ?? CHECKOUT_URL)
            }
            // Nếu thanh toán COD thì chuyển đến trang đơn hàng
            router.push(`${ORDER_URL}`)
        } catch (error) {
            console.log("error", error)
            toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
        }
    }

    const getOrder = useCallback(() => {
        const orderString = sessionStorage.getItem('order');
        if (orderString) {
            const orderStorage = JSON.parse(orderString);
            setOrderCheckout(orderStorage)
        }
    }, [])

    const handleChangeAddressShipping = (shipping: ShippingAddress) => {

        if (!shipping) return toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
        setShippingOrder(shipping)
    }
    useEffect(() => {
        if (shippingAddress && shippingAddress.length > 0) {
            setShippingOrder(shippingAddress[0])
        }
        getOrder()
    }, [])

    const totalPrice = orderCheckout?.order_products.reduce((sum, product) => {
        const price = product.product_price ?? 0;
        const quantity = product.quantity ?? 1;
        return sum + price * quantity;
    }, 0);

    if (!orderCheckout) return <NotFound content='Không tìm thấy đơn hàng' className='w-screen h-screen' />

    const isOrderAble = orderCheckout && orderCheckout.order_products.length > 0
    const shipping = orderCheckout && orderCheckout?.order_products.length > 0 ? orderCheckout?.order_shipping ?? 0 : 0;
    const shippingDiscount = orderCheckout?.order_discount_shipping ?? 0;
    const discount = orderCheckout?.order_discount ?? 0
    const finalPrice = (totalPrice ?? 0) - discount - shippingDiscount + 15000;


    return (
        <ContainerLayout isPrivate={true} isFooter={false}  >
            <div className="flex  w-full">
                <PopupShippingAddress isOpen={isChangeShipping} setIsOpen={setIsChangeShipping} onChangeAddress={handleChangeAddressShipping} />
                <div className="w-full">
                    <div className="pb-3">
                        <Breadcrumb items={[{ label: "Trang Chủ", href: "/" }, { label: "Thanh Toán", href: "#" }]} />
                    </div>
                    <div className="w-full min-h-screen">
                        <div className='w-full flex flex-col lg:flex-row gap-3'>
                            <div className="space-y-4 w-full flex-grow">
                                <div className="flex-grow rounded-lg h-fit border border-color py-[21px] px-[23px]">
                                    <h1 className='text-[14px] font-[700] leading-[26px]'>Mua Thêm tại đây</h1>
                                    {productAddition && productAddition.results.length > 0 && productAddition.results.map((product) => (
                                        <div className="flex items-center justify-between">
                                            <div
                                                key={product.id}
                                                className="flex gap-3 items-stretch text-[12px] py-2"
                                            >
                                                <Image src={(product?.product_thumbnail && product?.product_thumbnail?.startsWith("http")) ? product.product_thumbnail : "/defineImage.png"} alt={product.product_name} width={110} height={110} className='shadow rounded-lg' />
                                                <div className="flex flex-col justify-between text-black text-3 leading-[19px]">
                                                    <p className=" font-[700] uppercase">
                                                        {product.product_vendor.name}
                                                    </p>
                                                    <p className=" line-clamp-2">
                                                        {product.product_name}
                                                    </p>

                                                    <div className="flex space-x-1">
                                                        <GroupStart
                                                            starActive={Math.round(product.product_rate)}
                                                            className="text-yellow-400 w-[100px] max-h-[20px]" // Gold for star ratings
                                                        />
                                                        <p>({product.product_rate})</p>
                                                    </div>
                                                    <Price
                                                        product_price={product.product_price}
                                                    />
                                                </div>
                                            </div>
                                            <button className='py-[9px] px-[21px] font-[700] text-[14px] border border-color rounded-full hover:text-red-200'
                                                onClick={() => handleAddProduct(product)}
                                            >Thêm</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-grow rounded-lg h-fit border border-color py-[21px] px-[23px]">
                                    <h1 className='text-[14px] font-[700] leading-[26px] pb-4'>Thương Hiệu</h1>
                                    {loading ? (
                                        <LoadingPage className='!w-full !h-[300px]' />
                                    ) :
                                        (
                                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                                                {productAddition && productAddition.results.length > 0 && productAddition.results.map(
                                                    (product) => (
                                                        <Link href={`${DETAIL_PRODUCT_URL}/${product.id}`} key={product.id}>
                                                            <CardProductFull
                                                                key={product.id}
                                                                id={product.id}
                                                                product_thumbnail={product.product_thumbnail}
                                                                product_name={product.product_name}
                                                                product_price={product.product_price}
                                                                product_rate={product.product_rate}
                                                                product_brand={product.product_vendor.name}
                                                                product_description={product.product_description}
                                                            />
                                                        </Link>

                                                    )
                                                )}
                                            </div>

                                        )}
                                </div>
                            </div>
                            <div className="fixed bottom-0 left-0 lg:sticky lg:top-2 max-w-full lg:max-w-[372px] lg:h-[491px] w-full lg:max-h-[95vh] lg:overflow-y-scroll scrollbar space-y-3">
                                {/* CHECKOUT */}
                                {!show && <div className="block md:hidden absolute -top-[15%] left-[50%] transform -translate-x-1/2 transition-opacity duration-300 ease-in-out">
                                    <IconButton onClick={() => setShow(true)} icon={<BiChevronUp />} />
                                </div>}
                                {show && <div className="absolute top-[10px] right-[10px] transition-opacity duration-300 ease-in-out">
                                    <IconButton onClick={() => setShow(false)} icon={<CloseIcon />} />
                                </div>}
                                <div className="bg-white px-4 py-0 lg:py-4 rounded-lg space-y-2 transition-all duration-300 ease-in-out"
                                    style={{
                                        boxShadow: '#3969b340 0px 0px 10px 0px',
                                    }}>
                                    <h2 className={`${!show ? "opacity-0 h-0" : "opacity-100 h-auto"} lg:opacity-100 lg:h-auto text-[14px] font-bold text-center transition-all duration-300 ease-in-out`}>Đơn hàng</h2>

                                    <div className="flex gap-3 items-start  text-[12px] w-full border-b-[1px] pb-2 border-color ">
                                        <b className='whitespace-nowrap' >Giao tới:</b>
                                        <p>{shippingOrder?.address || "Bạn muốn đơn hàng giao tới địa chỉ nào?"}</p>
                                        <button onClick={() => setIsChangeShipping(true)}>Đổi</button>
                                    </div>
                                    <div
                                        className={`${!show ? "opacity-0 max-h-0" : "opacity-100 max-h-[250px]"} lg:opacity-100 lg:max-h-[230px] overflow-auto transition-all scrollbar duration-300 ease-in-out`}
                                    >
                                        {orderCheckout?.order_products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex gap-3 items-start text-[12px] py-2"
                                            >
                                                <Image src={product.product_thumbnail && product.product_thumbnail.startsWith('http') ? product.product_thumbnail : '/defineImage.png'} alt={product.product_name} width={80} height={80} className='shadow rounded-lg' />
                                                <div className="flex flex-col  gap-2 text-black text-3 leading-[19px]">
                                                    <p className=" line-clamp-2">
                                                        {product.product_name}
                                                    </p>
                                                    <div className="flex items-center gap-1 border-[2px] border-gray-200 rounded-full overflow-hidden w-[60px] ">
                                                        <IconButton icon={<BiMinus />} onClick={() => handleDecrease(product.id)} className='w-[30px] h-full !px-0 !py-[2px] ' />
                                                        <p className='text-[10px]'>{product.quantity}</p>
                                                        <IconButton icon={<BiPlus />} onClick={() => handleIncrease(product.id)} className='w-[30px] h-full !px-0 !py-[2px]' />
                                                    </div>
                                                    <Price
                                                        product_price={product.product_price}
                                                    />
                                                </div>
                                                <IconButton className='!bg-gray-300' onClick={() => handleRemoveProduct(product.id)} icon={<BiMinus />} />
                                            </div>
                                        ))}
                                    </div>
                                    {isOrderAble ? (
                                        <div className="space-y-2 text-[14px] leading-[21px]">
                                            <div className={`${!show ? "opacity-0 h-0" : "opacity-100 h-auto py-[15px]"} lg:opacity-100 lg:h-auto py-0 lg:py-[15px] border-b-[1px] border-t-[1px] border-color space-y-2 transition-all duration-300 ease-in-out`}>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Tổng tiền hàng</span>
                                                    <Price product_price={totalPrice ?? 0} className='text-black !font-light' />
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Phí vận chuyển</span>
                                                    <Price product_price={shipping} className='text-black !font-light' />
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
                                            </div>
                                            <div className="flex justify-between pt-2">
                                                <span className="text-[14px] text-black">Tổng tiền thanh toán</span>
                                                <Price product_price={finalPrice} className='text-red-400 text-[20px]' />
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-center ">Bạn chưa chọn sản phẩm nào</p>
                                    )}
                                    <div className={`${!show ? "opacity-0 h-0" : "opacity-100 h-auto"} lg:opacity-100 lg:h-auto bg-white space-y-4 mt-4 transition-all duration-300 ease-in-out`}>
                                        <div className="flex items-center justify-between font-medium">
                                            <p className='text-[14px]'>Chọn hình thức thanh toán</p>
                                        </div>
                                        <div className={`mt-5 ${!isOrderAble && "cursor-none opacity-[0.5]"}`}>
                                            <div className={`flex flex-col gap-5 `}>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        disabled={!isOrderAble}
                                                        type="radio"
                                                        value="cash"
                                                        checked={paymentMethod === 'cash'}
                                                        onChange={() => setPaymentMethod('cash')}
                                                        className="mr-2 disabled:opacity-[0.5] disabled:cursor-auto"
                                                    />
                                                    <div className="flex items-center gap-2 text-[12px]">
                                                        <Image src={"/images/cash.jpg"} alt="Receipt Payment" width={20} height={20} className=" rounded-full object-cover" />
                                                        <p>Thanh toán khi nhận hàng</p>
                                                    </div>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        disabled={!isOrderAble}
                                                        type="radio"
                                                        value="momo"
                                                        checked={paymentMethod === 'momo'}
                                                        onChange={() => setPaymentMethod("momo")}
                                                        className="mr-2 disabled:opacity-[0.5] disabled:cursor-auto"
                                                    />
                                                    <div className="flex items-center gap-2 text-[12px]">
                                                        <Image src={"/images/momo.png"} alt="PayPal Payment" width={20} height={20} className=" rounded-full object-cover" />
                                                        <p>Thanh toán bằng MoMo</p>
                                                    </div>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        disabled={!isOrderAble}
                                                        type="radio"
                                                        value="zalopay"
                                                        checked={paymentMethod === 'zalopay'}
                                                        onChange={() => setPaymentMethod("zalopay")}
                                                        className="mr-2 disabled:opacity-[0.5] disabled:cursor-auto"
                                                    />
                                                    <div className="flex items-center gap-2 text-[12px]">
                                                        <Image src={"/images/zalo.png"} alt="PayPal Payment" width={20} height={20} className="rounded-full object-cover" />
                                                        <p>Thanh toán bằng ZaloPay</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button disabled={!isOrderAble || loadingCreateOrder} className=" flex  items-center justify-center gap-2 bg-gradient disabled:opacity-[0.5] disabled:cursor-none cursor-pointer mt-4 w-full text-white py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
                                        onClick={() => handleConfirmOrder()}
                                    >
                                        {loadingCreateOrder && <LoadingIcon />}
                                        <p className=""> Đặt hàng</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}

export default CheckoutPage;