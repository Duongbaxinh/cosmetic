import { IconProps } from "@/types";

const CloseIcon = ({ className = "w-4 h-4", fill = "currentColor" }: IconProps) => {
    return (
        <svg viewBox="0 0 24 24" fill={fill} stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
};

export default CloseIcon;
