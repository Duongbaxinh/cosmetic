"use client";
import IconButton from "@/components/atoms/IconButton";
import Price from "@/components/atoms/Price";
import Drawer from "@/components/molecules/Drawer";
import { MESS_CART } from "@/config/mess.config";
import { useCart } from "@/contexts/cart.context";
import { useOrder } from "@/contexts/order.context";
import { priceDiscountProductCart } from "@/utils";
import { mapToOrderProduct } from "@/utils/mapper/convertToOrderProduct";
import { debounce } from "lodash";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";

function CartPage() {
    const { cart, updateCartItem, removeFromCart, clearCart, removeMultiProductInCart } = useCart();
    const { handlePurchase } = useOrder();
    const { isOpen: openDrawer, toggleDrawer } = useCart();
    const [localQuantities, setLocalQuantities] = useState<Record<string, number>>(
        {}
    );
    const [itemSelected, setItemSelected] = useState<string[]>([]);

    // Debounce chức năng cập nhật số lượng sản phẩm trong giỏ hàng
    const debounceChangeQuantity = useCallback(
        debounce(async (cartDetailId: string, newQuantity: number) => {
            if (newQuantity < 1) return;
            await updateCartItem(cartDetailId, newQuantity);
        }, 500),
        []
    );

    // Lưu số lượng sản phẩm trong giỏ hàng ở localstorage
    useEffect(() => {
        if (!cart || cart.cart_details.length <= 0) return;
        const initialQuantities: Record<string, number> = {};
        cart.cart_details.forEach((productDetail) => {
            initialQuantities[productDetail.id] = productDetail.quantity;
        });
        setLocalQuantities(initialQuantities);
    }, []);

    // gọi hàm cập nhật số lượng mỗi
    useEffect(() => {
        Object.entries(localQuantities).forEach(([cartDetailId, quantity]) => {
            if (quantity >= 1) {
                debounceChangeQuantity(cartDetailId, quantity);
            }
        });
    }, [localQuantities, debounceChangeQuantity]);

    // Đặt hàng 
    const handlePlaceOrder = async () => {
        let cartDetailIds: string[] = []
        if (!cart || cart?.cart_details.length <= 0) return;
        const productCarts = cart.cart_details
            .map((productDetail) => {
                if (itemSelected.includes(productDetail.id)) {
                    cartDetailIds.push(productDetail.id)
                    const quantity = localQuantities[productDetail.id] ?? productDetail.quantity
                    // Chuyển từ cart detail sang order product
                    return mapToOrderProduct(productDetail.product, quantity)
                }
            })
            .filter((product) => product !== undefined);

        // Lưu những cart detail id để xóa sau khi đơn hàng được tạo thành công
        sessionStorage.setItem("cartDetailIds", JSON.stringify(cartDetailIds))

        if (productCarts.length <= 0)
            return toast.error("Vui lòng chọn sản phẩm bạn muốn mua");
        return handlePurchase(productCarts);
    };

    // Chọn tất cả các sản phẩm trong giỏ hàng
    const handleSelectAll = (checked: boolean) => {
        if (!cart || cart.cart_details.length <= 0) return;
        if (checked) {
            const product_ids = cart.cart_details.map((product) => product.id);
            setItemSelected([...product_ids]);
        } else {
            setItemSelected([]);
        }
    };

    // Chọn từng sản phẩm trong giỏ hàng
    const handleSelectItem = (checked: boolean, id: string) => {
        if (checked && !itemSelected.includes(id)) {
            setItemSelected((prev) => [...prev, id]);
        } else {
            setItemSelected((prev) => prev.filter((item) => item !== id));
        }
    };

    // Xóa từng sản phẩm trong giỏ hàng
    const handleDeleteOne = async (cartDetailId: string) => {
        const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_ONE);
        if (confirm_delete && cart && cart.id) {
            await removeFromCart(cartDetailId);
        }
    };

    // Xóa nhiều sản phẩm cùng lúc
    const handleDeleteMany = async () => {
        if (itemSelected.length === 0) return alert(MESS_CART.ERROR_EMPTY_DELETE);
        const confirm_delete = window.confirm(MESS_CART.CONFIRM_DELETE_MANY);
        if (confirm_delete && cart?.cart_details.length === itemSelected.length) {
            await clearCart()
            return toast.info("Các sản phẩm trong giỏ hàng của bạn đã bị xóa")
        }
        if (confirm_delete && cart && cart.id) {
            await removeMultiProductInCart(itemSelected);
            return toast.info("sản phẩm trong giỏ hàng của bạn đã bị xóa")
        }
    };

    const handleIncrease = (id: string) => {
        const current =
            localQuantities[id] ?? cart?.cart_details.find((p) => p.id === id)?.quantity ?? 1;
        if (Number(current + 1) > 50) {
            return toast.info("Vui lòng liên hệ trực tiếp qua hotline để mua hàng với số lượng lớn")
        }
        setLocalQuantities((prev) => ({ ...prev, [id]: current + 1 }));
    };

    const handleDecrease = (id: string) => {
        const current =
            localQuantities[id] ?? cart?.cart_details.find((p) => p.id === id)?.quantity ?? 1;
        if (current === 1) {
            if (confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng không?")) {
                handleDeleteOne(id);
            }
            return;
        }
        setLocalQuantities((prev) => ({ ...prev, [id]: current - 1 }));
    };

    const handleChangeQuantity = (id: string, value: string) => {
        if (Number(value) > 50) {
            toast.info("Vui lòng liên hệ trực tiếp qua hotline để mua hàng với số lượng lớn")
        }
        const numericValue = Math.min(50, Number(value));
        if (/^\d*$/.test(value) && numericValue >= 0) {
            setLocalQuantities((prev) => ({ ...prev, [id]: numericValue }));
        }
    };

    const handleOnBlur = (id: string, e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || Number(value) < 1) {
            setLocalQuantities((prev) => ({ ...prev, [id]: 1 }));
        }
    };

    // Tính tổng giá tiền
    const totalPrice = useMemo(() => {
        if (!cart || !cart.cart_details) return 0;
        return cart.cart_details.reduce((sum, productDetail) => {
            const { finalPrice } = priceDiscountProductCart(productDetail.product)
            if (!itemSelected.includes(productDetail.id)) return sum;
            const qty = localQuantities[productDetail.id] ?? productDetail.quantity;
            return sum + finalPrice * qty;
        }, 0);
    }, [cart, localQuantities, itemSelected]);

    const product_quantity = cart && cart.cart_details ? cart.cart_details.length : 0;
    const isAll = cart && cart.cart_details.length === itemSelected.length;

    return (
        <Drawer
            isOpen={openDrawer}
            onClose={toggleDrawer}
            title="Giỏ hàng của tôi"
            className="!w-[350px] sm:!w-[400px] md:!w-[490px]"
        >
            <div className="w-full">
                <div className="flex-grow">
                    <div className="pt-4">
                        <div className="border-b border-color">
                            <div className="w-full flex justify-between items-center px-4 col-span-5 pb-5 pr-[20px] text-[14px] text-gray-400 leading-[20px] font-light gap-2 bg-white rounded-tl-sm rounded-bl-sm border-b border-color">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isAll ?? false}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                    />
                                    <span>Chọn tất cả {product_quantity}</span>
                                </div>
                                <IconButton
                                    className="!bg-gray-300"
                                    onClick={handleDeleteMany}
                                    icon={<BiMinus />}
                                />
                            </div>

                            <div className="pt-5">
                                {cart?.cart_details.map((productDetail) => {
                                    const { finalPrice } = priceDiscountProductCart(productDetail.product)
                                    return (
                                        <div
                                            key={productDetail.id}
                                            className="flex gap-3 items-start text-[12px] py-2 px-4"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={itemSelected.includes(productDetail.id)}
                                                onChange={(e) => handleSelectItem(e.target.checked, productDetail.id)}
                                            />
                                            <div className="flex items-start gap-3 w-full">
                                                <Image
                                                    src={productDetail.product?.product_thumbnail && productDetail.product.product_thumbnail.startsWith("http") ? productDetail.product.product_thumbnail : ""}
                                                    alt={productDetail.product.product_name}
                                                    width={80}
                                                    height={80}
                                                    className="shadow rounded-lg"
                                                />
                                                <div className="flex flex-col gap-2 text-black text-3 leading-[19px]">
                                                    <p className="line-clamp-2">{productDetail.product.product_name}</p>
                                                    <div className="flex items-center gap-1 border-[2px] border-gray-200 rounded-full overflow-hidden w-[60px]">
                                                        <IconButton
                                                            icon={<BiMinus />}
                                                            onClick={() => handleDecrease(productDetail.id)}
                                                            className="w-[30px] h-full !px-0 !py-[2px]"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={
                                                                (localQuantities[productDetail.id] === 0
                                                                    ? ""
                                                                    : localQuantities[productDetail.id]) ?? productDetail.quantity
                                                            }
                                                            onBlur={(e) => handleOnBlur(productDetail.id, e)}
                                                            onChange={(e) => handleChangeQuantity(productDetail.id, e.target.value)}
                                                            className="bg-white w-[20px] h-full rounded-sm text-black text-center"
                                                        />
                                                        <IconButton
                                                            icon={<BiPlus />}
                                                            onClick={() => handleIncrease(productDetail.id)}
                                                            className="w-[30px] h-full !px-0 !py-[2px]"
                                                        />
                                                    </div>
                                                    <Price
                                                        product_price={finalPrice}
                                                    />
                                                </div>
                                            </div>
                                            <IconButton
                                                className="!bg-gray-300"
                                                onClick={() => handleDeleteOne(productDetail.id)}
                                                icon={<BiMinus />}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="bg-white pt-3 px-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tổng tiền hàng</span>
                                    <Price product_price={totalPrice} />
                                </div>
                            </div>
                            <button
                                className="mt-4 w-full text-white py-2 rounded-lg bg-gradient "
                                onClick={() => handlePlaceOrder()}
                            >
                                Mua Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

export default CartPage;