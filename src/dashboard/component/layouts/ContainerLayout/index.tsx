"use client";

import { ReactNode, useEffect, useState } from "react";
import { BsBack } from "react-icons/bs";
import { ToastContainer } from 'react-toastify';
import Header from "../Header";
import { useRouter } from "next/navigation";
import Sidebar from "../SideBar";
import { authorization } from "@/utils/authentication";
import { Permissions } from "@/config/auth.config";
import LoadingPage from "@/components/pages/LoadingPage";


interface TypeContainer {
    isHeader?: boolean;
    isFoodTer?: boolean;
    isSidebar?: boolean;
    isPrivate?: boolean;
    children?: ReactNode;
    authentication?: string
}

export function ContainerLayout({
    isHeader = true,
    isPrivate = false,
    authentication,
    children
}: TypeContainer) {
    const router = useRouter();
    const [privateProcess, setPrivateProcess] = useState<boolean>(false);
    useEffect(() => {
        const checkAuth = () => {
            const scopeString = JSON.parse(localStorage.getItem("scope") || "");
            if (isPrivate && authentication) {
                const token = localStorage.getItem("accessToken");
                const hasAnyPermission = authorization(Permissions.sell, scopeString);
                if (!token || !hasAnyPermission) {
                    router.push('/');
                    return;
                }
            }
            setPrivateProcess(true);
        };

        checkAuth();
    }, [isPrivate, authentication, router]);

    if (!privateProcess) return <LoadingPage />
    return (
        <>
            <ToastContainer />
            <div className="flex w-full h-screen bg-white overflow-y-scroll mt-0 mx-auto ">
                <Sidebar />
                <div className="w-full h-[100vh] relative  ">
                    {isHeader && <Header />}
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </>
    );
}