'use client'
import CartPage from '@/components/pages/CartPage';
import { useCart } from '@/contexts/cart.context';
import React, { ReactNode, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../SideBar';
import SideBarDetail from '../SideBarDetail';
import './index.css'; // Import CSS file

interface ContainerLayoutProps {
    children: ReactNode;
    isHeader?: Boolean;
    isFooter?: Boolean;
    isSidebar?: Boolean;
    isSidebarDetail?: Boolean;
    classHeader?: string


}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children, isHeader = true, classHeader, isFooter = true, isSidebar = true, isSidebarDetail = false }) => {
    const { isOpen } = useCart();

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    return (
        <div className={`container-layout px-3 md:px-[63px]`}>
            <CartPage />
            {isHeader && <Header classHeader={classHeader} />}
            <div className="flex w-full py-3">
                {isSidebar && <div className="sidebar"><SideBar /></div>}
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
