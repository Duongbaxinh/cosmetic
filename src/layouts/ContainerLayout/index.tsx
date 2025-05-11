'use client'
import React, { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SideBar from '../SideBar';
import './index.css';  // Import CSS file
import SideBarDetail from '../SideBarDetail';

interface ContainerLayoutProps {
    children: ReactNode;
    isHeader?: Boolean;
    isFooter?: Boolean;
    isSidebar?: Boolean;
    isSidebarDetail?: Boolean;

}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children, isHeader = true, isFooter = true, isSidebar = true, isSidebarDetail = false }) => {
    return (
        <div className="container-layout">
            {isHeader && <Header />}
            <div className="flex w-full px-3 py-3">
                {isSidebar && <div className="sidebar"><SideBar /></div>}
                {isSidebarDetail && <div><SideBarDetail /></div>}
                <div className={`${isSidebar ? 'content' : 'w-full'} min-h-[100vh] pl-0 lg:pl-5`}>
                    {children}
                </div>
            </div>
            {isFooter && <Footer />}
        </div>
    );
};

export default ContainerLayout;
