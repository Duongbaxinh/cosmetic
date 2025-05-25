"use client"
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { LocationIcon, UserIcon } from '@/assets/icons';
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
import CartIcon from '@/assets/icons/CartIcon';
import Carousel from '@/components/atoms/Carousel';
import { SwiperSlide } from 'swiper/react';
import IconButton from '@/components/atoms/IconButton';
import { useCart } from '@/contexts/cart.context';

// Type definition for component props
interface HeaderProps {
    classHeader?: string
}


const Header: React.FC<HeaderProps> = ({ classHeader }: HeaderProps) => {
    const { user, isLogin, logout } = useAuth()
    const { isOpen: openCart, toggleDrawer } = useCart()

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
        router.push("/")
    };

    useEffect(() => {
        const shippingData = localStorage.getItem("shippingAddress");
        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, []);

    return (
        <Container className={classHeader && classHeader}   >
            <div className="w-full bg-white py-2  min-h-[140px]">
                <div className="flex items-start md:items-center justify-between gap-[20px] lg:gap-[48px] h-[60px]  ">
                    {/* Logo */}
                    <Link href="/">
                        <Image src={"/images/Logo.webp"} alt="Logo" width={190} height={39} className="min-w-[190px] min-h-[39px] max-w-[190px] max-h-[39px]" />
                    </Link>

                    {/* Search Input */}
                    <div className="space-x-2 space-y-2 text-gray-400 ">
                        <div className="flex items-center space-x-2">
                            <BoxSearch />
                        </div>
                    </div>

                    <div className="flex text-black ">
                        <ItemRectangle
                            className='!w-fit !font-bold hidden md:block'
                            icon={<UserIcon />}
                            title="Hệ thống cửa hàng"
                        />
                        <ItemRectangle
                            className='!w-fit !font-bold hidden md:block'
                            icon={<UserIcon />}
                            title="Tạp chí làm đẹp"
                        />
                        <div className="relative">
                            <Link href={!isLogin ? LOGIN_URL : '#'}>
                                <ItemRectangle
                                    onFunction={() => setIsOpen(!isOpen)}
                                    icon={<img src={"/icons/account.png"} alt="Account" className="w-6 h-6" />}
                                    title={isLogin ? 'Tài khoản' : 'Đăng nhập'}
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
                            onFunction={toggleDrawer}
                            icon={<CartIcon />}
                        />
                    </div>

                </div>
                <div className="h-[25px] mt-4">
                    <Carousel slidesPerView={8} >
                        {CATEGORY_CONFIG.map(({ title }) => (
                            <SwiperSlide key={title} className='!w-fit'>
                                <IconButton className='whitespace-nowrap border-[0.5px] border-gray-200 rounded-md !p-1 !text-black overflow-hidden !px-5 ' title={title} />
                            </SwiperSlide>
                        ))}

                    </Carousel>
                </div>
            </div >
        </Container >
    );
};

export default Header;
