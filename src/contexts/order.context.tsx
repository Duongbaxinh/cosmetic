"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useGetCartQuery, useAddToCartMutation, useUpdateCartItemMutation, useRemoveFromCartMutation, useClearCartMutation } from "@/redux/slices/cart.slice";
import { CartCheckout, OrderContextType, OrderProduct, Product, ShippingAddress } from "@/types";
import { Dispatch, SetStateAction } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/auth.slice";
import { setShippingAddress } from "@/redux/slices/shippingAddress.slice";
import { redirect } from "next/navigation";
import { CHECKOUT_URL } from "@/routers";
import { useCart } from "./cart.context";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { setIsOpen: setIsOpenCart } = useCart()
    const [isOpen, setIsOpen] = useState<{ openLogin: boolean, openContact: boolean }>({
        openLogin: false,
        openContact: false
    })
    const userInfo = useSelector((state: RootState) => state.user.user);
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);
    const dispatch = useDispatch()
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        const shippingData = localStorage.getItem("shippingAddress");

        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }

        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, []);
    const handlePurchase = (product: OrderProduct | OrderProduct[]) => {
        if (!userInfo) {
            return setIsOpen(prev => ({ ...prev, openLogin: true }));
        }
        if (shippingAddress.length <= 0) {
            return setIsOpen(prev => ({ ...prev, openContact: true }));
        }
        return proceedToCheckout({ product: product });
    };


    const proceedToCheckout = ({ shippingAddressNew, product }:
        {
            shippingAddressNew?: ShippingAddress,
            product?: OrderProduct | OrderProduct[]
        }
    ) => {
        let products: OrderProduct[] = [];

        if (Array.isArray(product)) {
            products = product;
        } else if (product) {
            products = [product];
        }

        const totalPrice = products.reduce((acc, item) => acc + item.product_price * item.quantity, 0);

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
                user_address: ""
            },
            order_products: products.map(item => ({
                id: item.id,
                product_price: item.product_price,
                product_thumbnail: item.product_thumbnail,
                product_name: item.product_name,
                quantity: item.quantity,
                product_total_price: item.product_price * item.quantity,
                product_discount: 0
            }))
        };

        if (userInfo && (shippingAddress || shippingAddressNew)) {
            sessionStorage.setItem("order", JSON.stringify(orderTemporary));
            setIsOpenCart(false)
            redirect(`${CHECKOUT_URL}`);
        }
    };

    return (
        <OrderContext.Provider
            value={{
                handlePurchase,
                proceedToCheckout,
                isOpen,
                setIsOpen
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
