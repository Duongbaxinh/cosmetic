import { ProductSkeletonType } from '@/types';
import React from 'react';

export const ProductSkeleton = ({ length, className }: ProductSkeletonType) => {
    return (
        <div className={`grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 ${className}`}>
            {Array.from({ length: length ?? 6 }).map((_, idx) => (
                <Skeleton key={idx} />
            ))}
        </div>
    );
};

export const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`w-[145px] h-[330px] p-2 rounded-xl shadow animate-pulse bg-white ${className}`}>
            <div className="h-44 bg-gray-300 rounded-md mb-2" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-4 bg-gray-300 rounded w-1/4" />
        </div>
    );
};
