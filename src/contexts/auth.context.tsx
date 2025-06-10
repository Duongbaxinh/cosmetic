"use client"
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import { clearUser, setUser, useGetUserQuery, useLogoutMutation } from "@/redux/slices/auth.slice";
import { clearShippingAddress, setShippingAddress, useGetAddressQuery } from "@/redux/slices/shippingAddress.slice";
import { AuthContextType } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useSaveLocalStorage('accessToken', null)
    const [refreshToken, setRefetchToken] = useSaveLocalStorage('refreshToken', null)
    const [scope, setScope] = useSaveLocalStorage("scope", null)
    const [isLogin, setIsLogin] = useSaveLocalStorage("isLogin", false);
    const [isAuth, setIsAuth] = useState<{ form: "login" | "register", isOpen: boolean } | null>(null);

    const [logoutRequest] = useLogoutMutation()

    // lấy thông tin người dùng khi họ đã đăng nhập
    const { data: userProfile, refetch: fetchUserInfo } = useGetUserQuery(undefined, {
        skip: !accessToken,
    });
    // lấy thông tin địa chỉ người dùng khi họ đã đăng nhập
    const { data: shippingAddress, refetch: fetchShipping } = useGetAddressQuery(undefined, {
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

    const logout = async () => {
        if (!accessToken && refreshToken) return
        await logoutRequest({
            access_token: accessToken,
            refresh_token: refreshToken
        })
        dispatch(clearUser());
        dispatch(clearShippingAddress());
        localStorage.clear()

        localStorage.setItem("isLogin", JSON.stringify(false))
        router.push('/')
        window.location.reload();
    };
    return (
        <AuthContext.Provider value={{
            logout, isLogin, accessToken, setAccessToken, setIsLogin, refreshToken, setRefetchToken, isAuth, setIsAuth, userProfile, shippingAddress, fetchUserInfo, fetchShipping, scope, setScope
        }}>
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