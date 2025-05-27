"use client";
import { HeartIcon } from '@/assets/icons';
import CartIcon from '@/assets/icons/CartIcon';
import Carousel from '@/components/atoms/Carousel';
import Container from '@/components/atoms/Container';
import IconButton from '@/components/atoms/IconButton';
import ItemRectangle from '@/components/atoms/ItemRetangle';
import { CATEGORY_CONFIG } from '@/components/config/categories.config';
import { PROFILE } from '@/components/config/profile';
import BoxSearch from '@/components/molecules/BoxSearch';
import { useAuth } from '@/contexts/auth.context';
import { useCart } from '@/contexts/cart.context';
import useClickOutside from '@/hooks/useClickOuside';
import { setShippingAddress } from '@/redux/slices/shippingAddress.slice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

// Type definition for component props
interface HeaderProps {
    classHeader?: string;
}

const Header: React.FC<HeaderProps> = ({ classHeader }: HeaderProps) => {
    const { isLogin, logout, setIsAuth } = useAuth();
    const { cart } = useCart()
    const { isOpen: openCart, toggleDrawer } = useCart();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);
    const dispatch = useDispatch();

    useClickOutside([profileRef], () => {
        setIsOpen(false);
    });

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const openLogin = () => {
        alert("run at here")
        setIsAuth({ form: "login", isOpen: true })
    }

    useEffect(() => {
        const shippingData = localStorage.getItem("shippingAddress");
        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, [dispatch]);

    const cartQuantity = cart?.cart_details.reduce((a, b) => {
        return a + b.quantity
    }, 0)

    return (
        <Container className={`bg-pink-50 ${classHeader}`}>
            <div className="w-full bg-white py-2 px-2 min-h-[140px]  rounded-b-lg">
                <div className="flex items-start md:items-center justify-between gap-[20px] lg:gap-[48px] h-[60px]">
                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/images/Logo.webp"
                            alt="Logo"
                            width={190}
                            height={39}
                            className="min-w-[190px] min-h-[39px] max-w-[190px] max-h-[39px] hidden md:block"
                        />
                        <Image
                            src="/images/momo.png"
                            alt="Logo"
                            width={30}
                            height={30}
                            className="rounded-full min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] block md:hidden"
                        />
                    </Link>

                    {/* Search Input */}
                    <div className="space-x-2 space-y-2 w-full">
                        <div className="flex items-center space-x-2 w-full">
                            <BoxSearch

                            />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <div className="relative">
                            <button onClick={() => { !isLogin ? openLogin() : () => { } }}>
                                <ItemRectangle
                                    className="border border-gray-200 !rounded-full bg-gradient-to-r from-pink-300 to-purple-400 text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500 transition-all duration-200"
                                    onFunction={() => setIsOpen(!isOpen)}
                                    title={isLogin ? 'Tài khoản' : 'Đăng nhập'}
                                />
                            </button>
                            {isOpen && isLogin && (
                                <div
                                    ref={profileRef}
                                    className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                                >
                                    <Container>
                                        {PROFILE.map(({ path, title }, index) => (
                                            <Link key={index} href={path}>
                                                <div className="py-2 px-4 hover:bg-pink-50 transition-colors duration-200">
                                                    <p className="text-[14px] text-gray-900">{title}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        <div
                                            className="cursor-pointer hover:bg-pink-50 transition-colors duration-200"
                                            onClick={handleLogout}
                                        >
                                            <div className="py-2 px-4">
                                                <p className="text-[14px] text-gray-900">Đăng xuất</p>
                                            </div>
                                        </div>
                                    </Container>
                                </div>
                            )}
                        </div>
                        <ItemRectangle
                            className="!w-fit border border-gray-200 !rounded-full min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] flex items-center justify-center bg-pink-50 hover:bg-pink-100 transition-colors duration-200"
                            onFunction={() => { }}
                            icon={<HeartIcon className="text-pink-600" />}
                        />
                        <ItemRectangle
                            babe
                            quantity={cartQuantity}
                            className="!w-fit border border-gray-200 !rounded-full min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] flex items-center justify-center bg-pink-50 hover:bg-pink-100 transition-colors duration-200"
                            onFunction={toggleDrawer}
                            icon={<CartIcon className="text-pink-600" />}
                        />
                    </div>
                </div>
                <div className="h-[25px] mt-4">
                    <Carousel
                        slidesPerView={8}
                        customSwipeWrap="!h-[50px]"
                        customButtonLeft="!top-[25px] left-[-25px] bg-pink-300 hover:bg-pink-400 text-white"
                        customButtonRight="!top-[25px] right-[-20px] bg-pink-300 hover:bg-pink-400 text-white"
                    >
                        {CATEGORY_CONFIG.map(({ title, url, id }, index) => (
                            <SwiperSlide key={index} className="!w-fit">
                                <Link href={`${url}/${id}`} className="flex items-center justify-center h-full">
                                    <IconButton
                                        className="whitespace-nowrap border border-gray-200 rounded-md !p-1 !text-gray-900 hover:bg-pink-100 transition-colors duration-200 !px-5"
                                        title={title}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Carousel>
                </div>
            </div>
        </Container>
    );
};

export default Header;