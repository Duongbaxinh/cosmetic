import { IconProps } from "@/types";

const HeartIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className}>
            <path d="M12 21.3l-1.5-1.3C5.4 15.3 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.8-8.5 11.5L12 21.3z" />
        </svg>
    );
};

export default HeartIcon;
