"use client"
import CloseIcon from '@/assets/icons/CloseIcon';
import IconButton from '@/components/atoms/IconButton';
import React, { Children, useEffect, useState } from 'react';

export type DrawerType = {
    isOpen: boolean,
    onClose: () => void,
    title?: string,
    children: React.ReactNode,
    className?: string
}

const Drawer = ({ isOpen, onClose, title, children, className }: DrawerType) => {
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
        <div className="relative">
            {/* Drawer */}
            <div
                className={`w-full fixed top-0 right-0 z-60 h-full bg-white shadow-lg transform transition-transform duration-300 ${className && className}  ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className=" overflow-auto max-h-screen">
                    <div className="h-[80px] sticky top-0 left-0 z-90 px-2 flex items-center justify-between text-black bg-white border-b border-color ">
                        <p className='!text-[22px] font-[700] leading-[22px] '>{title && title}</p>
                        <IconButton
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 "
                            icon={<CloseIcon />}
                        />
                    </div>
                    {children}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-80 z-50"
                    onClick={onClose}
                ></div>
            )}
        </div>
    );
};

export default Drawer;