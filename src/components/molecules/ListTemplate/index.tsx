'use client'
import React, { useEffect, useState } from 'react';
import GroupButton from '../GroupButton';
import TimeCount from '../../atoms/TimeCount';
import { ListTemplateProps } from '@/types';
import Link from 'next/link';

const ListTemplate: React.FC<ListTemplateProps> = ({ children, time, leading, trailing, listButton }) => {
    const [isSelected, setIsSelected] = useState<string>(listButton ? listButton[0] : "");

    const handleSelected = (value: string) => {
        setIsSelected(value);
    };

    useEffect(() => { }, [isSelected]);

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-lg font-medium">
                    {leading}
                    {time && <TimeCount hour={time.hour} minus={time.minus} />}
                </div>
                {trailing && trailing}
            </div>
            {listButton && (
                <GroupButton>
                    {listButton.map((item: string) => (
                        <button
                            key={item}
                            className={`py-2 px-4 border rounded ${item.toLowerCase() === isSelected.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                            onClick={() => handleSelected(item)}
                        >
                            {item}
                        </button>
                    ))}
                </GroupButton>
            )}
            {children}
        </div>
    );
};

export default ListTemplate;
