'use client'
import StarIcon from '@/assets/icons/Star';
import React from 'react';

// Type definition for props
interface GroupStartProps {
    numberOfStart: number;
    w?: string;
    h?: string;
}

const GroupStart: React.FC<GroupStartProps> = ({ numberOfStart, w = '20px', h = '20px' }) => {
    return (
        <div className="flex  items-center gap-[2px]">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <StarIcon />
            ))}
        </div>
    );
}

export default GroupStart;
