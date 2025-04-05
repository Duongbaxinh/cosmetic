'use client'
import { ListSpecialProps } from '@/types';
import React from 'react';

const ListSpecial: React.FC<ListSpecialProps> = ({ title }) => {
    return (
        <div className="flex items-start gap-2">
            <svg
                className="w-4 h-4 mt-1 text-blue-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 110-16 8 8 0 010 16zM4.293 9.293a1 1 0 011.414 0L8 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
            <span className="text-sm">{title}</span>
        </div>
    );
};

export default ListSpecial;
