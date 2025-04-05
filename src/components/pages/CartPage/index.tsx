"use client"
import { debounce } from 'lodash'
import TrashIcon from '@/assets/icons/Delete';
import IconButton from '@/components/atoms/IconButton';
import Price from '@/components/atoms/Price';
import ContainerLayout from '@/layouts/ContainerLayout';
import { deleteCartManyProduct, deleteCartProduct, useGetProductCart } from '@/services/cart.service';
import { handleCheckout } from '@/services/checkout.service';
import { CartCheckout } from '@/types';
import { useCallback, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MESS_CART } from '@/config/mess.config';
import { placeOrder } from '@/services';
import { redirect } from 'next/navigation';

function CartPage() {

    const { cart, loading, setCart } = useGetProductCart(true)
    const [itemSelected, setItemSelected] = useState<string[]>([])
    const debounceChangeQuantity = useCallback(
        debounce(async (payload: any) => {
            const result = await handleCheckout(payload, true)
            const cart_checkout = result as CartCheckout;
            console.log("check data :::: ", cart_checkout)
            setCart(cart_checkout as CartCheckout)
        }, 500),
        []
    )

    const handlePlaceOrder = async () => {
        if (cart && !cart.cart_id) return
        alert(`place order checkout ${cart?.cart_id}`)
        const payload = { cart_id: cart?.cart_id }
        const result = await placeOrder(payload, true)
        redirect(`/checkout/${result?.order_id}`)
    }

    const handleSelectAll = (checked: boolean) => {
        if (!cart || cart.cart_products.length < 0) return
        if (checked) {
            const product_ids = cart.cart_products.map(product => product.product_id)
            setItemSelected([...product_ids])
        } else {
            setItemSelected([])
        }
    }

    const handleSelectItem = (checked: boolean, product_id: string) => {
        if (checked && !itemSelected.includes(product_id)) {
            setItemSelected(prev => ([...prev, product_id]))
        } else {
            setItemSelected(prev => prev.filter(item => item !== product_id))
        }
    }

    const handleDeleteOne = async (product_id: string) => {
        const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_ONE)
        if (confirm_delete && cart && cart.cart_id) {
            const result = await deleteCartProduct(cart.cart_id, product_id, true)
            setCart(result as CartCheckout)
        }
    }

    const handleDeleteMany = async () => {
        if (itemSelected.length === 0) return alert(MESS_CART.ERROR_EMPTY_DELETE)
        const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_MANY)
        if (confirm_delete && cart && cart.cart_id) {
            const result = await deleteCartManyProduct(cart.cart_id, itemSelected, true)
            setCart(result as CartCheckout)
        }
    }

    const handleIncrease = async (product_id: string) => {
        const product = cart?.cart_products.find((product) => product.product_id === product_id)
        if (!product) return;
        const payload = {
            cart_id: cart?.cart_id,
            product_id: product_id,
            product_selected: itemSelected.includes(product_id),
            product_quantity: 1,
        }
        console.log("check payload increase", payload)
        debounceChangeQuantity(payload)
    }

    const handleDecrease = async (product_id: string) => {
        const product = cart?.cart_products.find((product) => product.product_id === product_id)
        if (!product) return;
        if (product && product_quantity === 1) {
            const confirm = window.confirm("Do you want remove product")
            if (confirm) {
                alert("remove product out cart")
            }
        }
        if (product && product_quantity > 1) {
            product.product_quantity = (product?.product_quantity - 1)
        }
        const payload = {
            cart_id: cart?.cart_id,
            product_id: product_id,
            product_selected: itemSelected.includes(product_id),
            product_quantity: - 1,
        }
        debounceChangeQuantity(payload)
    }

    const handleChangeQuantity = async (product_id: string, value: number) => {
        const product = cart?.cart_products.find((product) => product.product_id === product_id)
        if (!product) return;
        const payload = {
            cart_id: cart?.cart_id,
            product_id: product_id,
            product_quantity: value
        }
        debounceChangeQuantity(payload)
    }


    if (loading) return <h1>Loading</h1>
    const product_quantity = cart && cart.cart_products ? cart.cart_products.length : 0
    const isAll = cart && cart.cart_products.length === itemSelected.length;

    return (
        <ContainerLayout isSidebar={false} >
            <div className="w-full p-4">
                <h1>Giỏ hàng</h1>
                <div className='w-full flex flex-col md:flex-row gap-3'>
                    <div className="flex-grow ">
                        <div className="grid grid-cols-12 space-y-3">
                            <div className="col-span-5 py-3 pr-[20px] text-[14px] text-gray-400 leading-[20px] font-light flex items-center gap-2 bg-white rounded-tl-sm rounded-bl-sm pl-2 ">
                                <input type='checkbox' checked={isAll ?? false} onChange={(e) => handleSelectAll(e.target.checked)} />
                                <p>Tất cả ${product_quantity}</p>
                            </div>
                            <p className='col-span-2 py-3 text-[14px] text-gray-400 leading-[20px] font-light bg-white'>Đơn giá</p>
                            <p className='col-span-2 py-3 text-[14px] text-gray-400 leading-[20px] font-light  bg-white'>Số lượng</p>
                            <p className='col-span-2 py-3 text-[14px] text-gray-400 leading-[20px] font-light bg-white'>Thành tiền</p>
                            <div className='col-span-1 bg-white rounded-tr-sm rounded-br-sm flex items-center'
                                onClick={() => handleDeleteMany()}
                            ><TrashIcon /></div>

                            {cart?.cart_products.map((product) => (
                                <>
                                    <div className="col-span-5 py-3 pr-[20px] text-[14px] leading-[20px] font-light flex items-center gap-3 bg-white rounded-tl-sm rounded-bl-sm pl-2 ">
                                        <input type='checkbox' checked={itemSelected.includes(product.product_id)} onChange={(e) => handleSelectItem(e.target.checked, product.product_id)} />
                                        <img className='w-[80px] h-[80px]' src={product.product_thumbnail} alt='product image' />
                                        <span className='break-words line-clamp-3 text-[14px] leading-[20px]'>{product.product_name}</span>
                                    </div>
                                    <div className='col-span-2 flex items-center py-3 text-[14px] leading-[20px] font-light bg-white'>
                                        <Price product_price={product.product_price} />
                                    </div>
                                    <div className='col-span-2 flex items-center py-3 text-[14px] leading-[20px] font-light  bg-white'>
                                        <IconButton icon={<BiMinus />} onClick={() => handleDecrease(product.product_id)} className='w-[30px] h-[30px] shadow-sm' />
                                        <input value={product.product_quantity} type='number' onChange={(e) => { handleChangeQuantity(product.product_id, Number(e.target.value)) }} className=" bg-white w-[30px] h-[30px] shadow-sm rounded-sm text-black text-center " />
                                        <IconButton icon={<BiPlus />} onClick={() => handleIncrease(product.product_id)} className='w-[30px] h-[30px] shadow-sm' />
                                    </div>
                                    <div className='col-span-2 flex items-center py-3 text-[14px] leading-[20px] font-light bg-white'>
                                        <Price product_price={product.product_total_price} />
                                    </div>
                                    <div className='col-span-1 bg-white rounded-tr-sm rounded-br-sm flex items-center h-full max-h-[104px] '
                                        onClick={() => handleDeleteOne(product.product_id)}>
                                        <TrashIcon />
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="sticky top-2 max-w-[320px] h-[100px] w-full space-y-3 ">
                        <div className="bg-white p-4 rounded-lg shadow-sm max-w-md">
                            <div className="flex justify-between items-center">
                                <h3 className="text-gray-700 font-semibold">Giao tới</h3>
                                <button className="text-blue-600 text-sm hover:underline">Thay đổi</button>
                            </div>
                            <p className="text-gray-900 font-medium">{cart?.cart_user.user_name} </p>
                            <p className="text-green-600 text-sm">{cart?.cart_user.user_address} </p>
                        </div>
                        {/* CHECKOUT */}
                        <div className="bg-white p-4 rounded-lg shadow-sm max-w-md">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tổng tiền hàng</span>
                                    <Price product_price={cart?.cart_total_price ?? 0} />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Giảm giá trực tiếp</span>
                                    <Price product_price={cart?.cart_discount ?? 0} />
                                </div>
                                <div className="flex justify-between bcart-t pt-2">
                                    <span className="text-gray-800 font-semibold">Tổng tiền thanh toán</span>
                                    <Price product_price={cart?.cart_final_price ?? 0} />
                                </div>
                            </div>
                            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                                onClick={() => handlePlaceOrder()}
                            >
                                Mua Hàng (1)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}

export default CartPage;