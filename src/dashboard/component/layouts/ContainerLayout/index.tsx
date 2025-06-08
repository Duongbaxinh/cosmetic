"use client";

import { ReactNode, useEffect, useState } from "react";
import { BsBack } from "react-icons/bs";
import { ToastContainer } from 'react-toastify';
import Header from "../Header";
import { useRouter } from "next/navigation";
import Sidebar from "../SideBar";


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
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            if (isPrivate && authentication) {
                const token = localStorage.getItem("accessToken");
                const scopeString = JSON.parse(localStorage.getItem("scope") || "");

                const scopeList = scopeString.split(" ");
                const authList = authentication.split(" ");

                // Kiểm tra ít nhất 1 quyền trùng khớp
                const hasAnyPermission = authList.some(auth => scopeList.includes(auth));


                if (!token || !hasAnyPermission) {
                    router.push('/');
                    return;
                }
            }

            setPrivateProcess(true);
        };

        checkAuth();
    }, [isPrivate, authentication, router]);


    return (
        <>
            <ToastContainer />
            <div className="flex w-full h-screen bg-white overflow-y-scroll mt-0 mx-auto ">
                <Sidebar />
                <div className="w-full h-[100vh] relative  ">


                    {isHeader && <Header />}
                    <div className="w-full">{children}</div>

                    {/* <div
                        className={`absolute w-full h-full top-0 left-0 bg-text opacity-[0.2] ${isOpen ? "block" : "hidden"}`}
                    > */}
                    {/* <div className="h-[48px] ml-[20px] flex items-center">
                            <BsBack
                                className="w-6 h-6"
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        </>
    );
}