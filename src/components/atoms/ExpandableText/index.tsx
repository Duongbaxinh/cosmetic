import React, { useState, useRef, useEffect } from 'react';

interface ExpandableTextProps {
    className?: string;
    content: string;
    maxLines?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ content, maxLines = 3, className }) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [isOverflowed, setIsOverflowed] = useState<boolean>(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            const element = textRef.current;
            if (element) {
                const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
                const maxHeight = lineHeight * maxLines;
                setIsOverflowed(element.scrollHeight > maxHeight);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [content, maxLines]);

    return (
        <div className={`${className}`}>
            <p
                ref={textRef}
                className={`text-[13px] leading-[21px] text-gray-700 ${!showMore ? `line-clamp-${maxLines}` : ''
                    }`}
            >
                {content}
            </p>
            {isOverflowed && (
                <p
                    className="text-[13px] leading-[21px] text-blue-200 cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? 'Ẩn bớt' : 'Xem thêm'}
                </p>
            )}
        </div>
    );
};

export default ExpandableText;