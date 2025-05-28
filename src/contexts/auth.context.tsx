"use client"
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import { clearUser, setUser, useGetUserQuery } from "@/redux/slices/auth.slice";
import { clearShippingAddress, setShippingAddress, useGetAddressQuery } from "@/redux/slices/shippingAddress.slice";
import { ShippingAddress, UserProfileType, UserType } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface AuthContextType {
    accessToken: string,
    setAccessToken: (token: string) => void
    setRefetchToken: (token: string) => void
    refreshToken: (user: any) => void,
    setIsLogin: (isLogin: boolean) => void,
    isLogin: boolean,
    fetchUserInfo: () => Promise<any>,
    fetchShipping: () => Promise<any>,
    userProfile: UserProfileType | undefined,
    shippingAddress: ShippingAddress[] | undefined,
    logout: () => void,
    isAuth: { form: "login" | "register", isOpen: boolean } | null,
    setIsAuth: (form: { form: "login" | "register", isOpen: boolean }) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useSaveLocalStorage('accessToken', null)
    const [refreshToken, setRefetchToken] = useSaveLocalStorage('refreshToken', null)
    const [isLogin, setIsLogin] = useSaveLocalStorage("isLogin", false);
    const [isAuth, setIsAuth] = useState<{ form: "login" | "register", isOpen: boolean } | null>(null);

    const { data: userProfile, error: errorProfile, isLoading, refetch: fetchUserInfo } = useGetUserQuery(undefined, {
        skip: !accessToken,
    });

    const { data: shippingAddress, error: errorShippingAddress, refetch: fetchShipping } = useGetAddressQuery(undefined, {
        skip: !accessToken,
    });

    const dispatch = useDispatch();
    const router = useRouter()
    useEffect(() => {
        const accessToken = typeof window !== "undefined"
            ? (() => {
                const token = localStorage.getItem("accessToken");
                return token ? JSON.parse(token) : null;
            })()
            : null;
        setAccessToken(accessToken)
    }, []);
    useEffect(() => {
        if (userProfile) {
            dispatch(setUser(userProfile));
        }
        if (shippingAddress) {
            dispatch(setShippingAddress(shippingAddress))
        }
    }, [userProfile, shippingAddress]);

    const logout = () => {
        dispatch(clearUser());
        dispatch(clearShippingAddress());
        localStorage.clear()
        localStorage.setItem("isLogin", JSON.stringify(false))
        router.push('/')
        window.location.reload();
    };
    return (
        <AuthContext.Provider value={{ logout, isLogin, accessToken, setAccessToken, setIsLogin, refreshToken, setRefetchToken, isAuth, setIsAuth, userProfile, shippingAddress, fetchUserInfo, fetchShipping }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}