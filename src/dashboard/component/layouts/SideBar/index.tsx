import React, { useState, useEffect } from 'react';
import { FaBorderAll } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidDiscount } from "react-icons/bi";
import Link from 'next/link';
const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const menuItems = [
        { icon: <BiSolidDiscount />, label: 'Chương trình giảm giá', link: '/manage/promotion' },
        { icon: <AiFillProduct />, label: 'Quản lý sản phẩm', link: "/manage/product" },
        { icon: <FaBorderAll />, label: 'Quản lý đơn hàng', link: "/manage/order" },
    ];

    useEffect(() => {
        console.log('Is Collapsed:', isCollapsed);
    }, [isCollapsed]);

    return (
        <div className={`sticky top-0 left-0 h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-[350px]'}`}>
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <Link href="/"
                    className={`text-xl font-bold overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                >
                    HATU
                </Link>
                <button
                    onClick={toggleSidebar}
                    className="flex-shrink-0 focus:outline-none hover:bg-gray-700 p-1 rounded transition-colors duration-200"
                >
                    {isCollapsed ? '▶' : '◀'}
                </button>
            </div>
            <nav className="mt-4 px-2">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className={`flex  items-center py-4 px-2 text-gray-300 hover:bg-gray-700 rounded transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span
                            className={`ml-2 overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                        >
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;