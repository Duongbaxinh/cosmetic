import { IconProps } from "@/types";

const ChevronDownIcon = ({ className = "w-4 h-4", fill = "#000000" }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
    );
};

export default ChevronDownIcon;
