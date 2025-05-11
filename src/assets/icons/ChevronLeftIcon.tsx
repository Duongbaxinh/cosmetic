import { IconProps } from "@/types";

const ChevronLeftIcon = ({ className = "w-4 h-4", fill = "#111827" }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
    );
};

export default ChevronLeftIcon;
