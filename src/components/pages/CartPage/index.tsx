"use client"
import { debounce } from 'lodash'
import TrashIcon from '@/assets/icons/Delete';
import IconButton from '@/components/atoms/IconButton';
import Price from '@/components/atoms/Price';
import ContainerLayout from '@/layouts/ContainerLayout';
import { deleteCartManyProduct, deleteCartProduct, useGetProductCart } from '@/services/cart.service';
import { handleCheckout } from '@/services/checkout.service';
import { CartCheckout, ShippingAddress } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MESS_CART } from '@/config/mess.config';
import { placeOrder } from '@/services';
import { redirect } from 'next/navigation';
import Drawer from '@/components/molecules/Drawer';
import { useCart } from '@/contexts/cart.context';
import Image from 'next/image';
import { useOrder } from '@/contexts/order.context';
import PopupPrivate from '@/components/molecules/PopupPrivate';
import PopupInfo from '@/components/molecules/PopupInfo';

function CartPage() {

    const { cart, updateCartItem } = useCart()
    const { handlePurchase, proceedToCheckout, isOpen, setIsOpen } = useOrder()
    const { isOpen: openDrawer, toggleDrawer } = useCart()
    const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
    const [itemSelected, setItemSelected] = useState<string[]>([])

    const debounceChangeQuantity = useCallback(
        debounce(async (cart_id: string, product_id: string, quantity: number, selected: boolean) => {
            const payload = {
                cart_id,
                product_id,
                product_quantity: quantity,
                product_selected: selected,
            };
            const result = await updateCartItem(cart_id, product_id, quantity);
        }, 500),
        []
    );
    const updateQuantity = (id: string, newQuantity: number) => {
        if (!cart || !cart.cart_id || newQuantity < 1) return;
        setLocalQuantities(prev => ({
            ...prev,
            [id]: newQuantity
        }));
        debounceChangeQuantity(cart.cart_id, id, newQuantity, itemSelected.includes(id));
    };

    const handlePlaceOrder = async () => {
        if (!cart || cart?.cart_products.length <= 0) return
        return handlePurchase(cart.cart_products)
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
            // setCart(result as CartCheckout)
        }
    }

    // const handleDeleteMany = async () => {
    //     if (itemSelected.length === 0) return alert(MESS_CART.ERROR_EMPTY_DELETE)
    //     const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_MANY)
    //     if (confirm_delete && cart && cart.cart_id) {
    //         const result = await deleteCartManyProduct(cart.cart_id, itemSelected, true)
    //         setCart(result as CartCheckout)
    //     }
    // }

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

    const proceedToCheckoutOrder = (shippingAddressNew?: ShippingAddress) => {
        if (!cart || cart?.cart_products.length <= 0) return
        proceedToCheckout({ shippingAddressId: shippingAddressNew, product: cart.cart_products })
    }


    const totalPrice = useMemo(() => {
        if (!cart || !cart.cart_products) return 0;

        return cart.cart_products.reduce((sum, product) => {
            if (!itemSelected.includes(product.id)) return sum;
            const qty = localQuantities[product.id] ?? product.quantity;
            return sum + product.product_price * qty;
        }, 0);
    }, [cart, localQuantities, itemSelected]);


    useEffect(() => {
        if (!cart || cart.cart_products.length <= 0) return;

        const initialQuantities: Record<string, number> = {};
        cart.cart_products.forEach((product) => {
            initialQuantities[product.id] = product.quantity;
        });

        setLocalQuantities(initialQuantities);
    }, [cart]);

    const handleClosePopup = (filed: "openLogin" | "openContact") => {
        setIsOpen(prev => ({ ...prev, [filed]: false }))
    }
    // if (!cart) return <h1>Loading</h1>
    const product_quantity = cart && cart.cart_products ? cart.cart_products.length : 0
    const isAll = cart && cart.cart_products.length === itemSelected.length;

    return (
        <Drawer isOpen={openDrawer} onClose={toggleDrawer} title='Giỏ hàng của tôi'>
            {isOpen.openLogin && (<PopupPrivate isOpen={isOpen.openLogin} onClose={() => handleClosePopup('openLogin')} />)}
            {isOpen.openContact && (<PopupInfo isOpen={isOpen.openContact} onClose={() => handleClosePopup('openContact')} callBack={proceedToCheckoutOrder} />)}
            <div className="w-full">

                <div className='w-full flex flex-col md:flex-row gap-3'>
                    <div className="flex-grow">
                        <div className='pt-4'>
                            <div className="border-b border-color">
                                <div className=" px-4 col-span-5 pb-5 pr-[20px] text-[14px] text-gray-400 leading-[20px] font-light flex items-center gap-2 bg-white rounded-tl-sm rounded-bl-sm border-b border-color  ">
                                    <input type='checkbox' checked={isAll ?? false} onChange={(e) => handleSelectAll(e.target.checked)} />
                                    <p>Chọn tất cả {product_quantity}</p>
                                </div>

                                <div className="pt-5">
                                    {cart?.cart_products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex gap-3 items-start text-[12px] py-2  px-4"
                                        >
                                            <input type='checkbox' checked={itemSelected.includes(product.id)} onChange={(e) => handleSelectItem(e.target.checked, product.id)} />
                                            <Image src={product.product_thumbnail} alt={product.product_name} width={80} height={80} className='shadow rounded-lg' />
                                            <div className="flex flex-col  gap-2 text-black text-3 leading-[19px]">
                                                <p className=" line-clamp-2">
                                                    {product.product_name}
                                                </p>
                                                <div className="flex items-center gap-1 border-[2px] border-gray-200 rounded-full overflow-hidden w-[60px] ">
                                                    <IconButton icon={<BiMinus />} onClick={() => handleDecrease(product.id)} className='w-[30px] h-full !px-0 !py-[2px] ' />
                                                    <input value={localQuantities[product.id] ? localQuantities[product.id] : product.quantity} type='number'
                                                        onChange={(e) => { handleChangeQuantity(product.id, Number(e.target.value)) }}
                                                        className=" bg-white w-[20px]  text-black text-center outline-none border-0 " />
                                                    <IconButton icon={<BiPlus />} onClick={() => handleIncrease(product.id)} className='w-[30px] h-full !px-0 !py-[2px]' />
                                                </div>
                                                <Price product_price={localQuantities[product.id] ? product.product_price * (localQuantities[product.id]) : product.product_price} />
                                            </div>
                                            <IconButton className='!bg-gray-300' onClick={() => handleDeleteOne(product.id)} icon={<BiMinus />} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white pt-3  px-4 ">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng tiền hàng</span>
                                        <Price product_price={totalPrice} />
                                    </div>
                                </div>
                                <button className="mt-4 w-full text-white py-2 rounded-lg  bg-gradient"
                                    onClick={() => handlePlaceOrder()}
                                >
                                    Mua Hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

export default CartPage;