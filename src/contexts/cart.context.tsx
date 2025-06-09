"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
    useRemoveMultiProductInCartMutation,
} from "@/redux/slices/cart.slice";
import { CartCheckoutType, CartContextType } from "@/types";
import { useAuth } from "./auth.context";
import { useError } from "./error.context";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isLogin, setIsAuth, accessToken: authentication } = useAuth();
    const { handleError } = useError();
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartCheckoutType | null>(null);

    const accessToken = typeof window !== "undefined"
        ? (() => {
            const token = localStorage.getItem("accessToken");
            return token ? JSON.parse(token) : null;
        })()
        : null;

    const { data: cartData } = useGetCartQuery(undefined, {
        skip: !accessToken,
    });

    const [addToCartMutation] = useAddToCartMutation();
    const [removeMultiProductInCartMutation] = useRemoveMultiProductInCartMutation();
    const [updateCartItemMutation] = useUpdateCartItemMutation();
    const [removeFromCartMutation] = useRemoveFromCartMutation();
    const [clearCartMutation] = useClearCartMutation();

    const toggleDrawer = () => {
        if (!authentication) return setIsAuth({ form: 'login', isOpen: true });
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (cartData) {
            setCart(cartData);
        }
    }, [cartData]);

    const addToCart = async (cart_id: string, product_id: string, quantity: number) => {
        try {
            const res = await addToCartMutation({ cart_id, product_id, quantity });
            if ("error" in res) {
                handleError(res.error);
            }
        } catch (err) {
            handleError(err);
        }
    };

    const updateCartItem = async (cartDetailId: string, quantity: number) => {
        try {
            const res = await updateCartItemMutation({ cartDetailId, quantity });
            if ("error" in res) {
                handleError(res.error);
            }
        } catch (err) {
            handleError(err);
        }
    };

    const removeFromCart = async (cartDetailId: string) => {
        try {
            const res = await removeFromCartMutation(cartDetailId);
            if ("error" in res) {
                handleError(res.error);
            }
        } catch (err) {
            handleError(err);
        }
    };

    const removeMultiProductInCart = async (cartDetailIds: string[]) => {
        try {
            const res = await removeMultiProductInCartMutation(cartDetailIds);
            if ("error" in res) {
                return handleError(res.error);
            }
        } catch (err) {
            handleError(err);
        }
    };

    const clearCart = async () => {
        try {
            const res = await clearCartMutation();
            if ("error" in res) {
                handleError(res.error);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <CartContext.Provider
            value={{
                isOpen,
                toggleDrawer,
                cart,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart,
                setIsOpen,
                removeMultiProductInCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
