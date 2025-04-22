"use client"
import React, { useEffect, useState } from 'react';

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
    const auth = useAuth()
    const [isLogin, setIsLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('login') || 'false');
        setIsLogin(login);
    }, [isLogin]);

    const handleLogout = () => {
        localStorage.setItem('login', 'false');
        localStorage.setItem('UserType', JSON.stringify(null));
        window.location.reload();
    };
    const user = auth?.user
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
                                icon={<BiHome />}
                                title="Trang Chu"
                            />
                            <ItemRectangle
                                icon={<BiSolidUserAccount />}
                                title="Trang Chu"
                            />
                            <ItemRectangle
                                icon={<BiCartAdd />}

                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <LocationIcon className='w-[30px]' />
                            <p className=' text-[14px] leading-[21px] text-gray-400 underline truncate'> {user?.address}</p>
                        </div>
                    </div>
                    {/* <div className="flex flex-col  justify-start">
                        <div className="flex space-x-2">

                            <ItemRectangle
                                icon={<img src={"/icons/home.png"} alt="Home" className="w-6 h-6" />}
                                title="Trang Chu"
                            />


                            <div className="relative">
                                <ItemRectangle
                                    onFunction={() => setIsOpen(true)}
                                    icon={<img src={"/icons/account.png"} alt="Account" className="w-6 h-6" />}
                                    title={isLogin ? 'Tài khoản' : 'Log-in'}
                                />
                                {isLogin && isOpen && (
                                    <div
                                        className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg z-50"

                                    >
                                        <Container >
                                            {PROFILE.map(({ path, title }, index) => (
                                                <Link key={index} href={path}>

                                                    <div
                                                        className="py-2 px-4 hover:bg-gray-200"
                                                        title={title}
                                                    >
                                                        <p className='text-[14px]'>{title}</p>
                                                    </div>

                                                </Link>
                                            ))}
                                            <div
                                                className="cursor-pointer hover:bg-gray-200"
                                                onClick={handleLogout}
                                            >
                                                <p className='text-[14px]'>Đăng xuất</p>
                                            </div>
                                        </Container>
                                    </div>
                                )}
                                {!isLogin && <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} />}
                            </div>

                            <ItemRectangle
                                onFunction={() => setIsOpen(true)}
                                icon={<img src={"/icons/account.png"} alt="Account" className="w-6 h-6" />}
                            />

                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                            <img src={""} alt="Location" className="w-6 h-6" />
                            <Link href="#">

                                <p className="text-blue-400 text-[14px]">Giao đến: Your Address, Da Nang</p>

                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </Container>
    );
};

export default Header;
