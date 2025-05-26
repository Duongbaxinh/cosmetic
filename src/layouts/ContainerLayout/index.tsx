'use client'
import CartPage from '@/components/pages/CartPage';
import { useCart } from '@/contexts/cart.context';
import React, { ReactNode, use, useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../SideBar';
import SideBarDetail from '../SideBarDetail';
import './index.css'; // Import CSS file
import { useRouter } from 'next/navigation';
import { LOGIN_URL } from '@/routers';
import LoadingPage from '@/components/pages/LoadingPage';

interface ContainerLayoutProps {
    children: ReactNode;
    isHeader?: Boolean;
    isFooter?: Boolean;
    isSidebar?: Boolean;
    isSidebarDetail?: Boolean;
    classHeader?: string
    isPrivate?: Boolean;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children, isHeader = true, classHeader, isFooter = true, isSidebar = true, isSidebarDetail = false, isPrivate = false }) => {
    const [checkPrivate, setCheckPrivate] = useState(isPrivate);
    const router = useRouter();
    useEffect(() => {
        setCheckPrivate(true);
        const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
        if (!token && isPrivate) {
            router.push(LOGIN_URL);
        } else {
            setCheckPrivate(false);
        }

    }, []);
    if (checkPrivate) return <LoadingPage className='w-screen h-screen' />
    return (
        <div className={`container-layout px-3 lg:px-[63px] bg-white`}>
            <CartPage />
            {isHeader && <Header classHeader={classHeader} />}
            <div className="flex w-full py-3 justify-center">
                {isSidebarDetail && <div><SideBarDetail /></div>}
                <div className={`${isSidebar ? 'content' : 'w-full'} min-h-[100vh] pl-0`}>
                    {children}
                </div>
            </div>
            {isFooter && <Footer />}
        </div>
    );
};
export default ContainerLayout;
