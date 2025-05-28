"use client"
import IconButton from '@/components/atoms/IconButton';
import Price from '@/components/atoms/Price';
import Drawer from '@/components/molecules/Drawer';
import { MESS_CART } from '@/config/mess.config';
import { useCart } from '@/contexts/cart.context';
import { useOrder } from '@/contexts/order.context';
import { LOGIN_URL } from '@/routers';
import { deleteCartManyProduct } from '@/services/cart.service';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';

function CartPage() {

    const { cart, updateCartItem, removeFromCart } = useCart()
    const { handlePurchase, proceedToCheckout, isOpen, setIsOpen } = useOrder()
    const { isOpen: openDrawer, toggleDrawer } = useCart()
    const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
    const [itemSelected, setItemSelected] = useState<string[]>([])
    const router = useRouter()
    const debounceChangeQuantity = useCallback(
        debounce(async (cartDetailId: string, quantity: number, selected: boolean) => {
            await updateCartItem(cartDetailId, quantity);
        }, 500),
        []
    );
    const updateQuantity = (cartDetailId: string, newQuantity: number) => {
        if (!cart || !cart.id || newQuantity < 1) return;
        setLocalQuantities(prev => ({
            ...prev,
            [cartDetailId]: newQuantity
        }));
        debounceChangeQuantity(cartDetailId, newQuantity, itemSelected.includes(cartDetailId));
    };

    const handlePlaceOrder = async () => {
        if (!cart || cart?.cart_details.length <= 0) return
        const productCarts = cart.cart_details.map((productDetail) => {
            if (itemSelected.includes(productDetail.id)) {
                return {
                    id: productDetail.product.id,
                    product_name: productDetail.product.product_name,
                    product_price: productDetail.product.product_price,
                    product_thumbnail: productDetail.product.product_thumbnail,
                    quantity: productDetail.quantity,
                }
            }
        }).filter(product => product !== undefined);
        if (productCarts.length <= 0) return toast.error("Vui lòng chọn sản phẩm bạn muốn mua")
        return handlePurchase(productCarts)
    }

    const handleSelectAll = (checked: boolean) => {
        if (!cart || cart.cart_details.length < 0) return
        if (checked) {
            const product_ids = cart.cart_details.map(product => product.id)
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

    const handleDeleteOne = async (cartDetailId: string) => {
        const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_ONE)
        if (confirm_delete && cart && cart.id) {
            await removeFromCart(cartDetailId)
        }
    }

    const handleDeleteMany = async () => {
        if (itemSelected.length === 0) return alert(MESS_CART.ERROR_EMPTY_DELETE)
        const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_MANY)
        if (confirm_delete && cart && cart.id) {
            const result = await deleteCartManyProduct(cart.id, itemSelected, true)

        }
    }

    const handleIncrease = (id: string) => {
        const current = localQuantities[id] ?? cart?.cart_details.find(p => p.id === id)?.quantity ?? 1;
        updateQuantity(id, current + 1);
    };

    const handleDecrease = (id: string) => {
        const current = localQuantities[id] ?? cart?.cart_details.find(p => p.id === id)?.quantity ?? 1;
        if (current === 1) {
            if (confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng không?")) {
                handleDeleteOne(id);
            }
            return;
        }
        updateQuantity(id, current - 1);
    };

    const handleChangeQuantity = (id: string, value: string) => {
        updateQuantity(id, Number(value));
    };
    const handleOnBlur = (id: string, e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            updateQuantity(id, 1);
        }
    };

    const totalPrice = useMemo(() => {
        if (!cart || !cart.cart_details) return 0;

        return cart.cart_details.reduce((sum, productDetail) => {
            if (!itemSelected.includes(productDetail.id)) return sum;
            const qty = localQuantities[productDetail.id] ?? productDetail.quantity;
            return sum + productDetail.product.product_price * qty;
        }, 0);
    }, [cart, localQuantities, itemSelected]);

    useEffect(() => {
        if (!cart || cart.cart_details.length <= 0) return;
        const initialQuantities: Record<string, number> = {};
        cart.cart_details.forEach((productDetail) => {
            initialQuantities[productDetail.id] = productDetail.quantity;
        });

        setLocalQuantities(initialQuantities);
    }, [cart]);

    const handleClosePopup = (filed: "openLogin" | "openContact") => {
        setIsOpen(prev => ({ ...prev, [filed]: false }))
    }
    const product_quantity = cart && cart.cart_details ? cart.cart_details.length : 0
    const isAll = cart && cart.cart_details.length === itemSelected.length;

    return (
        <Drawer isOpen={openDrawer} onClose={toggleDrawer} title='Giỏ hàng của tôi' className='!w-[350px] sm:!w-[400px] md:!w-[490px]'>
            <div className="w-full">

                <div className='w-full flex flex-col md:flex-row gap-3'>
                    <div className="flex-grow">
                        <div className='pt-4'>
                            <div className="border-b border-color">
                                <div className="  w-full flex justify-between items-center px-4 col-span-5 pb-5 pr-[20px] text-[14px] text-gray-400 leading-[20px] font-light gap-2 bg-white rounded-tl-sm rounded-bl-sm border-b border-color  ">
                                    <div className="flex items-center gap-2">
                                        <input type='checkbox' checked={isAll ?? false} onChange={(e) => handleSelectAll(e.target.checked)} />
                                        <span>Chọn tất cả {product_quantity}</span>
                                    </div>
                                    <IconButton className='!bg-gray-300' onClick={handleDeleteMany} icon={<BiMinus />} />
                                </div>

                                <div className="pt-5">
                                    {cart?.cart_details.map((productDetail) => (
                                        <div
                                            key={productDetail.id}
                                            className="flex gap-3 items-start    text-[12px] py-2  px-4"
                                        >
                                            <input type='checkbox' checked={itemSelected.includes(productDetail.id)} onChange={(e) => handleSelectItem(e.target.checked, productDetail.id)} />
                                            <div className="flex items-start gap-3 w-full">
                                                <Image src={productDetail.product.product_thumbnail} alt={productDetail.product.product_name} width={80} height={80} className='shadow rounded-lg' />
                                                <div className="flex flex-col  gap-2 text-black text-3 leading-[19px]">
                                                    <p className=" line-clamp-2">
                                                        {productDetail.product.product_name}
                                                    </p>
                                                    <div className="flex items-center gap-1 border-[2px] border-gray-200 rounded-full overflow-hidden w-[60px] ">
                                                        <IconButton icon={<BiMinus />} onClick={() => handleDecrease(productDetail.id)} className='w-[30px] h-full !px-0 !py-[2px] ' />
                                                        <input
                                                            type="text"
                                                            value={product_quantity === 0 ? "" : product_quantity.toString()}
                                                            onBlur={(e) => handleOnBlur(productDetail.id, e)}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (/^\d*$/.test(value)) {
                                                                    handleChangeQuantity(productDetail.id, value);
                                                                }
                                                            }}
                                                            className=" bg-white w-[20px]  text-black text-center outline-none border-0 "
                                                        />
                                                        <IconButton icon={<BiPlus />} onClick={() => handleIncrease(productDetail.id)} className='w-[30px] h-full !px-0 !py-[2px]' />
                                                    </div>
                                                    <Price product_price={localQuantities[productDetail.id] ? productDetail.product.product_price * (localQuantities[productDetail.id]) : productDetail.product.product_price} />
                                                </div>
                                            </div>
                                            <IconButton className='!bg-gray-300' onClick={() => handleDeleteOne(productDetail.id)} icon={<BiMinus />} />
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