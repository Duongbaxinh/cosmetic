import { IconProps } from "@/types";

const ChevronRightIcon = ({ className = "w-4 h-4", fill = "#111827" }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
    );
};

export default ChevronRightIcon;
