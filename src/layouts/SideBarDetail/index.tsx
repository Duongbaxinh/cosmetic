"use client";
import CloseIcon from '@/assets/icons/CloseIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import { SIDEBAR_DETAIL, SidebarDetailType } from '@/components/config/sidebarDetail';
import { URL_SHOP, URL_SHOP_MANAGE } from '@/consts';
import { useAuth } from '@/contexts/auth.context';
import { setUser } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { authentication } from '@/utils/authentication';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaShopify } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

interface SideDetailProps {
    // Define any other props if needed
}

const SideBarDetail: React.FC<SideDetailProps> = () => {
    const scope = "vendor:basic_access customer:basic_access"
    const [showFull, setShowFull] = React.useState<boolean>(false);
    const path_name = usePathname();
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, [dispatch]);

    return (
        <div
            className={`w-full flex justify-center transition-all duration-300 ease-in-out ${showFull ? "max-w-[280px] min-w-[180px]" : "max-w-[60px] min-w-[60px]"
                } md:max-w-[280px] md:min-w-[280px] px-1 text-black`}
            style={{ scrollbarWidth: "none" }}
        >
            <div className="flex flex-col gap-4 p-0 md:p-2 w-full">
                <div className="w-full text-[13px] font-light leading-[15px] space-y-3">
                    <div className={`hidden md:flex gap-3 items-center transition-opacity duration-300 ${showFull ? "opacity-100" : "opacity-0 md:opacity-100"}`}>
                        <ProfileIcon className="w-[50px] h-[50px] rounded-full" />
                        <div>
                            <p>Tài khoản của</p>
                            <p>{user?.username}</p>
                        </div>
                    </div>
                    <div
                        className={`flex md:hidden ${showFull ? "justify-end" : "justify-center"} cursor-pointer`}
                        onClick={() => setShowFull(!showFull)}
                    >
                        {showFull ? (
                            <CloseIcon className="w-[24px] h-[24px] text-gray-500" />
                        ) : (
                            <MenuIcon className="w-[24px] h-[24px] text-gray-500" />
                        )}
                    </div>
                    {SIDEBAR_DETAIL.map((item: SidebarDetailType, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`block px-2 py-2 md:px-4 ${path_name === item.path ? "bg-pink-300 text-white" : ""
                                } hover:bg-pink-300 hover:text-white rounded-sm w-full flex ${showFull ? "justify-start" : "justify-center"
                                } md:justify-start transition-all duration-300`}
                        >
                            <div className="flex items-center gap-1 sm:gap-6">
                                <item.icon className="w-[24px] h-[24px]" />
                                <p
                                    className={`${showFull ? "block" : "hidden"
                                        } md:block text-[13px] font-light leading-[15px] transition-opacity duration-300 ${showFull ? "opacity-100" : "opacity-0 md:opacity-100"
                                        }`}
                                >
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {scope === "vendor:basic_access customer:basic_access" && authentication(scope, "vendor:basic_access") && (
                        <Link
                            href={URL_SHOP}
                            className={`block px-2 py-2 md:px-4 ${path_name === URL_SHOP ? "bg-pink-300 text-white" : ""
                                } hover:bg-pink-300 hover:text-white rounded-sm w-full flex ${showFull ? "justify-start" : "justify-center"
                                } md:justify-start transition-all duration-300`}
                        >
                            <div className="flex items-center gap-1 sm:gap-6">
                                <FaShopify />
                                <p
                                    className={`${showFull ? "block" : "hidden"
                                        } md:block text-[13px] font-light leading-[15px] transition-opacity duration-300 ${showFull ? "opacity-100" : "opacity-0 md:opacity-100"
                                        }`}
                                >
                                    Quản lý gian hàng
                                </p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBarDetail;