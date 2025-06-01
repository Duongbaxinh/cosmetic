'use client'
import CartPage from '@/components/pages/CartPage';
import LoadingPage from '@/components/pages/LoadingPage';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import SideBarDetail from '../SideBarDetail';
import './index.css'; // Import CSS file

interface ContainerLayoutProps {
    children: ReactNode;
    isHeader?: Boolean;
    isFooter?: Boolean;
    isSidebar?: Boolean;
    isSidebarDetail?: Boolean;
    classHeader?: string
    isPrivate?: Boolean;
    isCategory?: Boolean
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children, isHeader = true, classHeader, isFooter = true, isSidebar = true, isSidebarDetail = false, isPrivate = false, isCategory }) => {
    const [checkPrivate, setCheckPrivate] = useState(isPrivate);
    const router = useRouter();
    useEffect(() => {
        setCheckPrivate(true);
        const token = JSON.parse(localStorage.getItem('accessToken') || 'null');
        if (!token && isPrivate) {
            router.push('/');
        } else {
            setCheckPrivate(false);
        }

    }, []);
    if (checkPrivate) return <LoadingPage className='w-screen h-screen' />
    return (
        <div className={`container-layout px-1 md:px-3 lg:px-[63px] bg-white`}>
            <CartPage />
            {isHeader && <Header classHeader={classHeader} isCategory={isCategory} />}
            <div className="flex w-full py-3 justify-center">
                {isSidebarDetail && <div><SideBarDetail /></div>}
                <div className={`w-full min-h-[100vh] pl-0`}>
                    {children}
                </div>
            </div>
            {isFooter && <Footer />}
        </div>
    );
};
export default ContainerLayout;
