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

    return (
        <Container>
            <div className="w-full bg-white py-3 px-5">
                <div className="flex items-center justify-between  gap-6  ">
                    {/* Logo */}
                    <Link href="/">
                        <img src={"/images/tiki_logo.png"} alt="Logo" className="w-[20px] h-[20px]" />
                    </Link>

                    {/* Search Input */}
                    <div className="flex-grow">
                        <div className="">
                            <div className="flex items-center space-x-2">
                                <Input placeholder='Tìm kiếm sản phẩm...' className='p-2' tailIcon={<HiSearchCircle />} />
                            </div>
                        </div>
                        {/* <div className="flex space-x-4 mt-2">
                        {ITEM_LINKS.map(({ path, title }, index) => (
                            <Link key={index} href={path}>

                                <p className="text-gray-400">{title}</p>

                            </Link>
                        ))}
                    </div> */}
                    </div>

                    {/* Info Section */}
                    <div className="">
                        <div className="flex">
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
                        <div className="">

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
