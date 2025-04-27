"use client"
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { HiSearchCircle } from 'react-icons/hi';
import { RiHomeOfficeFill } from 'react-icons/ri';
import { BiCar, BiCard, BiCartAdd, BiHome, BiSolidUserAccount } from 'react-icons/bi';
import { GiCardPick } from 'react-icons/gi';
import Container from '@/components/atoms/Container';
import ItemRectangle from '@/components/atoms/ItemRetangle';
import Input from '@/components/atoms/Input';
import Image from 'next/image';
import { CATEGORY_CONFIG } from '@/components/config/categories.config';
import { LocationIcon } from '@/assets/icons';
import { useAuth } from '@/contexts/auth.context';
import { CART_URL, LOGIN_URL } from '@/routers';
import { PROFILE } from '@/components/config/profile';
import useClickOutside from '@/hooks/useClickOuside';

// Type definition for component props
interface HeaderProps {
    // You can add any specific props here if needed
}

const TEXT = {
    TIM_KIEM: 'Tìm kiếm',
    PLACEHODER: 'Nhập sản phẩm tìm kiếm'
};

const ITEM_LINKS = [
    { path: '/link1', title: 'Link 1' },
    { path: '/link2', title: 'Link 2' }
];

const Header: React.FC<HeaderProps> = () => {
    const { user, setIsLogin, isLogin } = useAuth()

    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

    useClickOutside([profileRef], () => {
        setIsOpen(false)
    });

    const handleLogout = () => {
        setIsLogin(false);
        window.location.reload();
    };
    console.log('check user :::: ', user);
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
                            <Input placeholder='Tìm kiếm sản phẩm...' className='p-2 text-gray-400 ' tailIcon={<HiSearchCircle />} />
                        </div>
                        {CATEGORY_CONFIG.map((item) => (
                            <Link href={item.url} key={item.url} className='text-[14px] leading-[21px] text-gray-400'>{item.title}</Link>
                        ))}
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
                        <div className="flex items-center gap-2">
                            <LocationIcon className='w-[30px]' />
                            <p className=' text-[14px] leading-[21px] text-gray-400 underline truncate'> {user?.address}</p>
                        </div>
                    </div>

                </div>
            </div >
        </Container >
    );
};

export default Header;
