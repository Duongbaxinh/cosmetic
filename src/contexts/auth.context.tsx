"use client"
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import { clearUser } from "@/redux/slices/auth.slice";
import { UserType } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthContextType {
    user: UserType | null,
    accessToken: string,
    setAccessToken: (token: string) => void
    setUser: (user: any) => void,

    setIsLogin: (isLogin: boolean) => void,
    isLogin: boolean,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useSaveLocalStorage("user", null);
    const [accessToken, setAccessToken] = useSaveLocalStorage('accessToken', null)
    const [isLogin, setIsLogin] = useSaveLocalStorage("isLogin", false);

    const dispatch = useDispatch();
    const router = useRouter()
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        setIsLogin(false);
        dispatch(clearUser());
        localStorage.removeItem("accessToken");
        router.replace('/')
    };
    return (
        <AuthContext.Provider value={{ user, setUser, logout, isLogin, accessToken, setAccessToken, setIsLogin }}>
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