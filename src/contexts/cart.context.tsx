"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useGetCartQuery, useAddToCartMutation, useUpdateCartItemMutation, useRemoveFromCartMutation, useClearCartMutation } from "@/redux/slices/cart.slice";
import { CartCheckout, CartContextType } from "@/types";
import { useAuth } from "./auth.context";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isLogin, setIsAuth } = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartCheckout | null>(null);

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
    const [updateCartItemMutation] = useUpdateCartItemMutation();
    const [removeFromCartMutation] = useRemoveFromCartMutation();
    const [clearCartMutation] = useClearCartMutation();

    const toggleDrawer = () => {
        if (!isLogin) return setIsAuth({ form: 'login', isOpen: true })
        setIsOpen((prev) => !prev)
    };

    useEffect(() => {
        if (cartData) {
            setCart(cartData);
        }
    }, [cartData]);


    const addToCart = async (cart_id: string, product_id: string, quantity: number) => {
        await addToCartMutation({ cart_id, product_id, quantity });
    };

    const updateCartItem = async (cartDetailId: string, quantity: number) => {
        await updateCartItemMutation({ cartDetailId, quantity });
    };

    const removeFromCart = async (cartDetailId: string) => {
        await removeFromCartMutation(cartDetailId);
    };

    const clearCart = async () => {
        await clearCartMutation();
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
                setIsOpen
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
