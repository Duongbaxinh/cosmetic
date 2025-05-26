"use client"
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import { clearUser } from "@/redux/slices/auth.slice";
import { clearShippingAddress } from "@/redux/slices/shippingAddress.slice";
import { UserType } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthContextType {
    user: UserType | null,
    accessToken: string,
    setAccessToken: (token: string) => void
    setUser: (user: any) => void,
    setRefetchToken: (token: string) => void
    refreshToken: (user: any) => void,
    setIsLogin: (isLogin: boolean) => void,
    isLogin: boolean,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useSaveLocalStorage("user", null);
    const [accessToken, setAccessToken] = useSaveLocalStorage('accessToken', null)
    const [refreshToken, setRefetchToken] = useSaveLocalStorage('refreshToken', null)
    const [isLogin, setIsLogin] = useSaveLocalStorage("isLogin", false);

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
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        dispatch(clearUser());
        dispatch(clearShippingAddress());
        localStorage.clear()
        localStorage.setItem("isLogin", JSON.stringify(false))
        router.push('/')
        window.location.reload();
    };
    return (
        <AuthContext.Provider value={{ user, setUser, logout, isLogin, accessToken, setAccessToken, setIsLogin, refreshToken, setRefetchToken }}>
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