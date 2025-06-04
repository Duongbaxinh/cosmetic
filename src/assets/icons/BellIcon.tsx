import { IconProps } from "@/types";

const BellIcon = ({ className = 'w-4 h-4', fill = 'currentColor' }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className}>
            <path d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6v-5c0-3-1.8-5.6-4.5-6.3V4h-3v.7C7.8 5.4 6 8 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
    );
};

export default BellIcon;
