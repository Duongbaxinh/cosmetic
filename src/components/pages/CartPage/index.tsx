"use client"
import { debounce } from 'lodash'
import TrashIcon from '@/assets/icons/Delete';
import IconButton from '@/components/atoms/IconButton';
import Price from '@/components/atoms/Price';
import ContainerLayout from '@/layouts/ContainerLayout';
import { deleteCartManyProduct, deleteCartProduct, useGetProductCart } from '@/services/cart.service';
import { handleCheckout } from '@/services/checkout.service';
import { CartCheckout } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MESS_CART } from '@/config/mess.config';
import { placeOrder } from '@/services';
import { redirect } from 'next/navigation';

function CartPage() {

    const { cart, loading, setCart } = useGetProductCart(true)
    const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
    const [itemSelected, setItemSelected] = useState<string[]>([])

    const debounceChangeQuantity = useCallback(
        debounce(async (cart_id: string, id: string, quantity: number, selected: boolean) => {
            try {
                const payload = {
                    cart_id,
                    id,
                    product_quantity: quantity,
                    product_selected: selected,
                };
                const result = await handleCheckout(payload, true);
                setCart(result as CartCheckout);
            } catch (err) {
                console.error("Update quantity failed", err);
                // Optional: rollback localQuantities or notify user
            }
        }, 500),
        []
    );
    const updateQuantity = (id: string, newQuantity: number) => {
        if (!cart || !cart.cart_id || newQuantity < 1) return;
        setLocalQuantities(prev => ({
            ...prev,
            [id]: newQuantity
        }));
        // debounceChangeQuantity(cart.cart_id, id, newQuantity, itemSelected.includes(id));
    };

    const handlePlaceOrder = async () => {
        if (cart && !cart.cart_id) return
        if (cart?.cart_products && cart?.cart_products.length <= 0 || itemSelected.length === 0) return alert("vui long chon san pham")
        alert(`place order checkout ${cart?.cart_id}`)
        const payload = { cart_id: cart?.cart_id }
        const result = await placeOrder(payload, true)
        redirect(`/checkout/${result?.order_id}`)
    }

    const handleSelectAll = (checked: boolean) => {
        if (!cart || cart.cart_products.length < 0) return
        if (checked) {
            const product_ids = cart.cart_products.map(product => product.id)
            setItemSelected([...product_ids])
        } else {
            setItemSelected([])
        }
    }

    const handleSelectItem = (checked: boolean, id: string) => {
        if (checked && !itemSelected.includes(id)) {
            setItemSelected(prev => ([...prev, id]))
        } else {
            setItemSelected(prev => prev.filter(item => item !== id))
        }
    }

    const handleDeleteOne = async (id: string) => {
        const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_ONE)
        if (confirm_delete && cart && cart.cart_id) {
            const result = await deleteCartProduct(cart.cart_id, id, true)
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

    const handleIncrease = (id: string) => {
        const current = localQuantities[id] ?? cart?.cart_products.find(p => p.id === id)?.quantity ?? 1;
        updateQuantity(id, current + 1);
    };

    const handleDecrease = (id: string) => {
        const current = localQuantities[id] ?? cart?.cart_products.find(p => p.id === id)?.quantity ?? 1;
        if (current === 1) {
            if (confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng không?")) {
                handleDeleteOne(id);
            }
            return;
        }
        updateQuantity(id, current - 1);
    };

    const handleChangeQuantity = (id: string, value: number) => {
        const newValue = Math.max(1, value);
        updateQuantity(id, newValue);
    };

    const totalPrice = useMemo(() => {
        if (!cart || !cart.cart_products) return 0;

        return cart.cart_products.reduce((sum, product) => {
            if (!itemSelected.includes(product.id)) return sum;
            const qty = localQuantities[product.id] ?? product.quantity;
            return sum + product.product_price * qty;
        }, 0);
    }, [cart, localQuantities, itemSelected]);


    useEffect(() => {
        if (!cart || !cart.cart_products) return;

        const initialQuantities: Record<string, number> = {};
        cart.cart_products.forEach((product) => {
            initialQuantities[product.id] = product.quantity;
        });

        setLocalQuantities(initialQuantities);
    }, [cart]);


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
                                        <input type='checkbox' checked={itemSelected.includes(product.id)} onChange={(e) => handleSelectItem(e.target.checked, product.id)} />
                                        <img className='w-[80px] h-[80px]' src={product.product_thumbnail ?? null} alt='product image' />
                                        <span className='break-words line-clamp-3 text-[14px] leading-[20px]'>{product.product_name}</span>
                                    </div>
                                    <div className='col-span-2 flex items-center py-3 text-[14px] leading-[20px] font-light bg-white'>
                                        <Price product_price={product.product_price} />
                                    </div>
                                    <div className='col-span-2 flex items-center py-3 text-[14px] leading-[20px] font-light  bg-white'>
                                        <IconButton icon={<BiMinus />} onClick={() => handleDecrease(product.id)} className='w-[30px] h-[30px] shadow-sm' />
                                        <input value={localQuantities[product.id] ? localQuantities[product.id] : product.quantity} type='number' onChange={(e) => { handleChangeQuantity(product.id, Number(e.target.value)) }} className=" bg-white w-[30px] h-[30px] shadow-sm rounded-sm text-black text-center " />
                                        <IconButton icon={<BiPlus />} onClick={() => handleIncrease(product.id)} className='w-[30px] h-[30px] shadow-sm' />
                                    </div>
                                    <div className='col-span-2 flex items-center py-3 text-[14px] leading-[20px] font-light bg-white'>
                                        <Price product_price={localQuantities[product.id] ? product.product_price * (localQuantities[product.id]) : product.product_price} />
                                    </div>
                                    <div className='col-span-1 bg-white rounded-tr-sm rounded-br-sm flex items-center h-full max-h-[104px] '
                                        onClick={() => handleDeleteOne(product.id)}>
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
                                    <Price product_price={totalPrice} />
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">Giảm giá trực tiếp</span>
                                    <Price product_price={cart?.cart_discount ?? 0} />
                                </div> */}
                                <div className="flex justify-between bcart-t pt-2">
                                    <span className="text-gray-800 font-semibold">Tổng tiền thanh toán</span>
                                    <Price product_price={totalPrice ?? 0} />
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