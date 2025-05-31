'use client'
import StarIcon from '@/assets/icons/Star';
import React, { Dispatch, SetStateAction, useState } from 'react';

// Type definition for props
interface GroupStartProps {
    w?: string;
    h?: string;
    starCount?: number;
    starActive?: number;
    starDis?: number;
    label?: string;
    onHover?: Dispatch<SetStateAction<number>>;
    onClick?: () => void,
    customStar?: string,
    className?: string
}

const GroupStart: React.FC<GroupStartProps> = ({ onClick, starActive = 5, starDis = 0, label, className, customStar, onHover }) => {
    const [click, setClick] = useState(false)
    return (
        <div onClick={onClick}
            className={`flex items-center gap-1 cursor-pointer ${className}`}>
            {/* Hiển thị số sao vàng */}
            {Array.from({ length: starActive }).map((_, index) => (
                <StarIcon key={`filled-${index}`} className={`${customStar}`} />
            ))}
            {/* Hiển thị sao trống để đủ 5 */}
            {Array.from({ length: 5 - starActive }).map((_, index) => (
                <div
                    onMouseEnter={onHover ? () => onHover(index + 1) : () => { }}
                    onMouseLeave={onHover ? () => {
                        onHover(click ? (index + 1) : 0)
                        setClick(false)
                    } : () => { }}
                    onClick={onHover ? () => {
                        setClick(true)
                        onHover(index + 1)
                    } : () => { }}
                >
                    <StarIcon key={`empty-${index}`} fill='#c6c5c1' className={`${customStar}`} />
                </div>
            ))}
            {label && <p className="flex items-center gap-[2px] ml-2 text-sm font-bold text-gray-400">{label} <StarIcon /></p>}
        </div>
    );
}

export default GroupStart;
