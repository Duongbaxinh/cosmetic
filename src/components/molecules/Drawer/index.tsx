"use client";
import CloseIcon from '@/assets/icons/CloseIcon';
import IconButton from '@/components/atoms/IconButton';
import React, { useEffect } from 'react';

export type DrawerType = {
    isOpen: boolean;
    onClose: () => void;
    title?: string | React.ReactNode;
    children: React.ReactNode;
    className?: string;
};

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
        <div className="relative font-sans">
            {/* Drawer */}
            <div
                className={`w-[300px] fixed top-0 right-0 z-60 h-full bg-white shadow-xl transform transition-transform duration-500 ease-in-out ${className} ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="overflow-auto max-h-screen">
                    <div className="h-[80px] sticky top-0 left-0 z-90 px-4 flex items-center justify-between bg-pink-50 border-b border-pink-200">
                        {title && typeof (title) === "string" ? (
                            <h2 className="text-lg font-semibold text-gray-800">
                                {title}
                            </h2>
                        ) : (
                            title
                        )}
                        <IconButton
                            onClick={onClose}
                            className="text-pink-500 hover:text-pink-700 transition-transform duration-200 hover:scale-110"
                            icon={<CloseIcon className="w-6 h-6" />}
                            aria-label="Close drawer"
                        />
                    </div>
                    <div>{children}</div>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gradient-to-b from-black/50 to-pink-900/30 opacity-0 transition-opacity duration-500 ease-in-out z-50"
                    style={{ opacity: isOpen ? 0.8 : 0 }}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default Drawer;