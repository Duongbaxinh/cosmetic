"use client";
import { HeartIcon, UserIcon } from '@/assets/icons';
import CartIcon from '@/assets/icons/CartIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import Carousel from '@/components/atoms/Carousel';
import Container from '@/components/atoms/Container';
import IconButton from '@/components/atoms/IconButton';
import ItemRectangle from '@/components/atoms/ItemRetangle';
import { CATEGORY_CONFIG } from '@/components/config/categories.config';
import { PROFILE } from '@/components/config/profile';
import BoxSearch from '@/components/molecules/BoxSearch';
import Drawer from '@/components/molecules/Drawer';
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
    isCategory?: Boolean
}

const Header: React.FC<HeaderProps> = ({ classHeader, isCategory = true }: HeaderProps) => {
    const { isLogin, logout, setIsAuth, userProfile } = useAuth();
    const { cart } = useCart()
    const { isOpen: openCart, toggleDrawer } = useCart();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<{ openPhone: boolean, "openComputer": boolean }>({ "openPhone": false, "openComputer": false });
    const profileRef = useRef<HTMLDivElement | null>(null);
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);
    const dispatch = useDispatch();

    useClickOutside([profileRef], () => {
        setIsOpen(prev => ({ ...prev, 'openComputer': false }));
    });

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const openLogin = () => {
        setIsAuth({ form: "login", isOpen: true })
    }

    useEffect(() => {
        const shippingData = localStorage.getItem("shippingAddress");
        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, [dispatch]);

    const cartQuantity = cart?.cart_details.length ?? 0
    // const cartQuantity = cart?.cart_details.reduce((a, b) => {
    //     return a + b.quantity
    // }, 0)
    const userName = userProfile ? userProfile.username : ""
    return (
        <Container className={`bg-pink-50 ${classHeader}`}>
            <Drawer
                title=
                {<Image
                    src="/images/Logo.png"
                    alt="Logo"
                    width={190}
                    height={39}
                    className="min-w-[190px] min-h-[39px] max-w-[190px] max-h-[39px]"
                />}
                className="!w-[300px] font-sans  block sm:!hidden"
                isOpen={isOpen.openPhone}
                onClose={() => setIsOpen(prev => ({ ...prev, openPhone: false }))}
            >
                <div
                    ref={profileRef}
                    className="w-full bg-white rounded-lg z-50 overflow-hidden"
                >
                    {PROFILE.map(({ path, title }, index) => (
                        <Link key={index} href={path}>
                            <div
                                className={`py-2 px-4 flex items-center gap-3 hover:bg-pink-50 transition-all duration-200 rounded-md  "text-gray-900"
                                        } hover:scale-[1.02]`}
                            >
                                {/* {Icon && <Icon className="w-5 h-5 text-pink-500" />} */}
                                <p className="text-[14px] font-medium">{title}</p>
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

                </div>
            </Drawer>

            <div className="w-full bg-white py-2 px-2 min-h-[150px] sm:min-h-[110px]  rounded-b-lg">
                <div className="flex items-center sm:items-start md:items-center justify-between gap-[10px] sm:gap-[20px] lg:gap-[48px] h-[35px]">
                    {/* Logo */}
                    {isLogin ? (<div onClick={() => setIsOpen(prev => ({ openPhone: true, openComputer: false }))} > <MenuIcon className=' block sm:hidden w-[40px] ' /></div>
                    ) : (
                        <div onClick={() => { !isLogin ? openLogin() : () => { } }}> <LoginIcon className=' block sm:hidden w-[35px] ' /></div>
                    )}

                    <Link href="/">
                        <Image
                            src="/images/Logo.png"
                            alt="Logo"
                            width={190}
                            height={39}
                            className="min-w-[150px] sm:min-w-[190px] min-h-[39px] max-w-[190px] max-h-[39px]"
                        />

                    </Link>

                    {/* Search Input */}
                    <div className=" hidden sm:block space-x-2 space-y-2 w-full">
                        <div className="flex items-center space-x-2 w-full">
                            <BoxSearch

                            />
                        </div>
                    </div>

                    <div className=" flex gap-2 items-center">
                        <div className="relative">
                            <button className='hidden sm:block' onClick={() => { !isLogin ? openLogin() : () => { } }}>
                                <ItemRectangle
                                    className="group border-[1.5px] border-black !rounded-full hover:border-pink-300 hover:bg-transparent  hover:text-pink-300 transition-all duration-200"
                                    onFunction={() => setIsOpen(prev => ({ openPhone: false, openComputer: !prev.openComputer }))}
                                    title={isLogin ? userName.toString() : 'Đăng nhập'}
                                    icon={isLogin ? <UserIcon className="text-black group-hover:text-pink-300 transition-colors duration-200" /> : ""}
                                />
                            </button>
                            {isOpen.openComputer && isLogin && (
                                <div
                                    ref={profileRef}
                                    className="hidden sm:block absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
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
                <div className=" block sm:hidden  pt-3 w-full">
                    <div className="flex items-center space-x-2 w-full">
                        <BoxSearch
                        />
                    </div>
                </div>
                <div className=" h-[25px] mt-4">
                    <Carousel
                        slidesPerView={8}
                        customSwipeWrap="!h-[50px]"
                        customButtonLeft="!top-[25px] left-0 md:left-[-25px] bg-pink-300 hover:bg-pink-400 text-white"
                        customButtonRight="!top-[25px] right-0 md:right-[-20px] bg-pink-300 hover:bg-pink-400 text-white"
                    >
                        {isCategory && CATEGORY_CONFIG.map(({ title, url, id }, index) => (
                            <SwiperSlide key={index} className="!w-fit">
                                <Link href={`${url}/${id}`} className="flex items-center justify-center h-full">
                                    <IconButton
                                        className="whitespace-nowrap border border-gray-200 rounded-md !p-1 !text-gray-900 hover:text-pink-500  hover:bg-pink-100 transition-colors duration-200 !px-5"
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