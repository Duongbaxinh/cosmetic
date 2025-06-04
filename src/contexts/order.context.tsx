"use client"
import { OrderContextType, OrderProduct, ShippingAddress } from "@/types";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { MESS_SYSTEM } from "@/config/mess.config";
import { setUser } from "@/redux/slices/auth.slice";
import { setShippingAddress } from "@/redux/slices/shippingAddress.slice";
import { RootState } from "@/redux/store";
import { CHECKOUT_URL } from "@/routers";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "./auth.context";
import { useCart } from "./cart.context";
import { useError } from "./error.context"; // ✅ Import hook xử lý lỗi

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { setIsOpen: setIsOpenCart, isOpen: isOpenCart } = useCart();
    const { setIsAuth } = useAuth();
    const { handleError } = useError(); // ✅ Dùng hook

    const [orderProduct, setOrderProduct] = useState<OrderProduct | OrderProduct[]>([]);
    const [isOpen, setIsOpen] = useState<{ openLogin: boolean; openContact: boolean }>({
        openLogin: false,
        openContact: false,
    });
    const router = useRouter()
    const userInfo = useSelector((state: RootState) => state.user.user);
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const userData = localStorage.getItem("userInfo");
            const shippingData = localStorage.getItem("shippingAddress");

            if (accessToken && userData) {
                dispatch(setUser(JSON.parse(userData)));
            }
            if (shippingData) {
                dispatch(setShippingAddress(JSON.parse(shippingData)));
            }
        } catch (err) {
            handleError(err);
        }
    }, []);

    const handlePurchase = (product: OrderProduct | OrderProduct[]) => {
        try {
            if (isOpenCart) setIsOpenCart(false);
            if (!userInfo) {
                return setIsAuth({ form: "login", isOpen: true });
            }
            if (shippingAddress.length === 0) {
                setOrderProduct(product);
                return setIsOpen((prev) => ({ ...prev, openContact: true }));
            }
            return proceedToCheckout({ product });
        } catch (err) {
            console.log("check error cart ", err)
            handleError(err);
        }
    };

    const proceedToCheckout = ({
        shippingAddressNew,
        product,
    }: {
        shippingAddressNew?: ShippingAddress;
        product?: OrderProduct | OrderProduct[];
    }) => {
        try {
            let products: OrderProduct[] = [];

            if (Array.isArray(product)) {
                products = product;
            } else if (product) {
                products = [product];
            }

            const totalPrice = products.reduce((acc, item) => acc + item.product_price * item.quantity, 0);

            if (!shippingAddressNew && shippingAddress.length === 0) {
                return toast.error(MESS_SYSTEM.UNKNOWN_ERROR);
            }

            const orderTemporary = {
                order_quantity: products.reduce((acc, item) => acc + item.quantity, 0),
                order_total_price: totalPrice,
                order_discount: 0,
                order_final_price: totalPrice,
                order_shipping: 15000,
                order_shippingAddress: shippingAddressNew ?? shippingAddress[0],
                order_expected_delivery_time: "2025-04-13T19:00:00Z",
                order_user: {
                    user_id: userInfo?.id,
                    user_name: userInfo?.username,
                    user_address: "",
                },
                order_products: products.map((item) => ({
                    id: item.id,
                    product_price: item.product_price,
                    product_thumbnail: item.product_thumbnail,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    product_total_price: item.product_price * item.quantity,
                    product_discount: 0,
                })),
            };

            if (userInfo && (shippingAddress.length > 0 || shippingAddressNew)) {
                sessionStorage.setItem("order", JSON.stringify(orderTemporary));
                router.push(`${CHECKOUT_URL}`);
            }
        } catch (err) {
            console.log("check error ddd", err)
            handleError(err);
        }
    };

    return (
        <OrderContext.Provider
            value={{
                handlePurchase,
                proceedToCheckout,
                isOpen,
                setIsOpen,
                orderProducts: orderProduct,
                setOrderProduct,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within a OrderProvider");
    }
    return context;
};
