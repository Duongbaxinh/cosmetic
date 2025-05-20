"use client"
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { LocationIcon } from '@/assets/icons';
import Container from '@/components/atoms/Container';
import ItemRectangle from '@/components/atoms/ItemRetangle';
import { CATEGORY_CONFIG } from '@/components/config/categories.config';
import { PROFILE } from '@/components/config/profile';
import BoxSearch from '@/components/molecules/BoxSearch';
import { MESS_DELIVERY } from '@/config/mess.config';
import { useAuth } from '@/contexts/auth.context';
import useClickOutside from '@/hooks/useClickOuside';
import { CART_URL, LOGIN_URL } from '@/routers';
import Image from 'next/image';
import { BiCartAdd, BiHome } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { setUser } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setShippingAddress } from '@/redux/slices/shippingAddress.slice';

// Type definition for component props
interface HeaderProps {
    // You can add any specific props here if needed
}


const Header: React.FC<HeaderProps> = () => {
    const { user, isLogin, logout } = useAuth()

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);

    const dispatch = useDispatch()
    useClickOutside([profileRef], () => {
        setIsOpen(false)
    });

    const handleLogout = () => {
        logout()
        router.replace("/")
    };

    useEffect(() => {
        const shippingData = localStorage.getItem("shippingAddress");
        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, []);
    const isAddress = user?.address !== '' && user?.address !== null
    return (
        <Container  >
            <div className="w-full bg-white py-3 px-6  ">
                <div className="flex items-start md:items-center justify-between gap-[20px]  lg:gap-[48px]  ">
                    {/* Logo */}
                    <Link href="/">
                        <Image src={"/LOGO.png"} alt="Logo" width={20} height={20} className="min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]" />
                    </Link>

                    {/* Search Input */}
                    <div className="flex-grow space-x-2 space-y-2 text-gray-400 ">
                        <div className="flex items-center space-x-2">
                            <BoxSearch />
                        </div>
                        <div className="hidden md:block space-x-2">
                            {CATEGORY_CONFIG.map((item) => (
                                <Link href={item.url} key={item.url} className='text-[14px] leading-[21px] text-gray-400'>{item.title}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="max-w-[300px] hidden md:block space-y-2">
                        <div className="flex text-gray-400 ">
                            <ItemRectangle
                                className='!w-fit'
                                icon={<BiHome />}
                                title="Trang Chu"
                            />
                            <div className="relative">
                                <Link href={!isLogin ? LOGIN_URL : '#'}>
                                    <ItemRectangle
                                        onFunction={() => setIsOpen(!isOpen)}
                                        icon={<img src={"/icons/account.png"} alt="Account" className="w-6 h-6" />}
                                        title={isLogin ? 'Tài khoản' : 'Log-in'}
                                    /></Link>
                                {isOpen && isLogin && (
                                    <div ref={profileRef} className="absolute right-0 top-12 w-64 bg-white overflow-hidden rounded-lg shadow-lg z-50"                                    >
                                        <Container >
                                            {PROFILE.map(({ path, title }, index) => (
                                                <Link key={index} href={path}>
                                                    <div className="py-2 px-4 hover:bg-gray-200" title={title}                                                    >
                                                        <p className='text-[14px]'>{title}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                            <div className="cursor-pointer hover:bg-gray-200" onClick={handleLogout}                                            >
                                                <div className="py-2 px-4 hover:bg-gray-200">
                                                    <p className='text-[14px]'>Đăng xuất</p>
                                                </div>
                                            </div>
                                        </Container>
                                    </div>
                                )}
                            </div>
                            <ItemRectangle
                                className='!w-fit'
                                icon={<Link href={`${CART_URL}`}><BiCartAdd /></Link>}
                            />
                        </div>
                        {isAddress && (
                            <div className="flex items-center gap-2">
                                <LocationIcon className='w-[20px]' />
                                <p className=' text-[14px] leading-[21px] text-gray-400 underline truncate'> {shippingAddress[0]?.address ?? MESS_DELIVERY.ADDRESS_MESS}</p>
                            </div>
                        )}
                    </div>

                </div>
            </div >
        </Container >
    );
};

export default Header;
