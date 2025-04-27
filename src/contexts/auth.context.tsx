"use client"
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import { useLoginMutation, useSignUpMutation } from "@/redux/slices/auth.slice";
import { UserType } from "@/types";
import { handleAxiosError } from "@/utils";
import { createContext, useContext, useEffect } from "react";

interface AuthContextType {
    user: UserType | null,
    setUser: (user: any) => void,
    setIsLogin: (isLogin: boolean) => void,
    isLogin: boolean,
    login: (username: string, password: string) => Promise<void>,
    register: (username: string, password: string) => Promise<void>,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useSaveLocalStorage("user", {
        id: "1",
        username: "duongbaxinh",
        first_name: "Xinh",
        last_name: "Duong Ba",
        phone: "0378700020",
        address: "08 Tien Son 9, Phuong Hoa Cuong Nam, Hai Chau, Da Nang"
    });
    const [isLogin, setIsLogin] = useSaveLocalStorage("isLogin", false);
    const [loginApi] = useLoginMutation();
    const [signUp] = useSignUpMutation();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const res = await loginApi({ username: username, password: password }).unwrap();
            setUser(res.user);
            setIsLogin(true);
        } catch (error) {
            handleAxiosError(error);
        }
    };
    const register = async (username: string, password: string) => {
        try {
            const res = await signUp({ username: username, password: password }).unwrap();
            setUser(res.user);
            setIsLogin(true);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const logout = () => {
        setIsLogin(false);
        setUser(null);

    };
    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isLogin, register, setIsLogin }}>
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