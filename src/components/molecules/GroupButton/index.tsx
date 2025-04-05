'use client'
import { GroupButtonProps } from '@/types';
import React from 'react';

const GroupButton: React.FC<GroupButtonProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-start gap-2">
            {children}
        </div>
    );
};

export default GroupButton;
