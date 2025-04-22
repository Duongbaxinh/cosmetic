import { IconProps } from "@/types";

const FilterIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 4h18l-7 9v6l-4 1v-7L3 4z" />
        </svg>
    );
};

export default FilterIcon;
