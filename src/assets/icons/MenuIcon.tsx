import { IconProps } from "@/types";

const MenuIcon = ({ className = 'w-4 h-4', fill = 'currentColor' }: IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
    );
};

export default MenuIcon;