import { IconProps } from "@/types";

const ShieldCheckIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => (
    <svg fill={fill} viewBox="0 0 24 24" className={className}>
        <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm-1 14l-3.5-3.5 1.41-1.41L11 13.17l4.59-4.59L17 10l-6 6z" />
    </svg>
);

export default ShieldCheckIcon;