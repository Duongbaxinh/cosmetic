import { IconProps } from "@/types";

const SearchIcon = ({ className = "w-4 h-4", fill = "#000000" }: IconProps) => {
    return (
        <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke={fill}
            strokeWidth={2}
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
        </svg>
    );
};

export default SearchIcon;
