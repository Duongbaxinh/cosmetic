"use client"
import { Login } from "@/services/auth.service";
import { AuthType, UserType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: UserType | null,
    setUser: (user: any) => void,
    token: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [user, setUser] = useState({})
    const [user, setUser] = useState<UserType | null>({
        id: "1",
        username: "duongbaxinh",
        first_name: "Xinh",
        last_name: "Duong Ba",
        phone: "0378700020",
        address: "08 Tien Son 9, Phuong Hoa Cuong Nam, Hai Chau, Da Nang"
    });

    const [token, setToken] = useState('');

    return (
        <AuthContext.Provider value={{ user, token, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("error")
    }
    return context
}