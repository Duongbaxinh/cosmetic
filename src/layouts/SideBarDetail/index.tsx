"use client"
import { SIDEBAR_DETAIL, SidebarDetailType } from '@/components/config/sidebarDetail';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
interface SideDetailProps {
    // Define any other props if needed
}

const SideBarDetail: React.FC<SideDetailProps> = () => {
    const path_name = usePathname();
    const user = {
        username: "duongbaxinh"
    }
    return (
        <div className=" hidden lg:block max-w-[280x] min-w-[280px] px-1  "
            style={{ scrollbarWidth: "none" }}>
            <div className="flex flex-col gap-4 p-2">
                <div className='w-full text-[13px] font-light leading-[15px] text-gray-400 space-y-3'>
                    <div className="flex gap-3 items-center">
                        <Image src={""} alt="avatar" className='w-[50px] h-[50px] bg-gray-300 rounded-full' width={50} height={50} />
                        <div className="">
                            <p>Tài khoản của</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    {SIDEBAR_DETAIL.map((item: SidebarDetailType, index) => (
                        <Link key={index} href={item.path} className={`block py-2 px-4 ${path_name === item.path && "bg-[#ebebf0] text-gray-500"} hover:bg-[#ebebf0] rounded-sm`}>
                            <div className="flex items-center gap-6">
                                {<item.icon className='w-[24px] h-[24px] text-gray-300' fill='#9b9b9b' />}
                                <p className='text-[13px] font-light leading-[15px]'>{item.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBarDetail;
