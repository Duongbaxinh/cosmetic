"use client"
import ProfileIcon from '@/assets/icons/ProfileIcon';
import { SIDEBAR_DETAIL, SidebarDetailType } from '@/components/config/sidebarDetail';
import { setUser } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
interface SideDetailProps {
    // Define any other props if needed
}

const SideBarDetail: React.FC<SideDetailProps> = () => {
    const path_name = usePathname();
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, []);

    return (
        <div className=" hidden lg:block max-w-[280x] min-w-[280px] px-1 text-black  "
            style={{ scrollbarWidth: "none" }}>
            <div className="flex flex-col gap-4 p-2">
                <div className='w-full text-[13px] font-light leading-[15px]  space-y-3'>
                    <div className="flex gap-3 items-center">
                        <ProfileIcon className='w-[50px] h-[50px] rounded-full' />
                        <div className="">
                            <p>Tài khoản của</p>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                    {SIDEBAR_DETAIL.map((item: SidebarDetailType, index) => (
                        <Link key={index} href={item.path} className={`block py-2 px-4 ${path_name === item.path && "bg-[#ebebf0]"} hover:bg-[#ebebf0] rounded-sm`}>
                            <div className="flex items-center gap-6">
                                {<item.icon className='w-[24px] h-[24px] ' fill='#fffff' />}
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
