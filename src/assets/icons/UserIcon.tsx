import { IconProps } from "@/types";

const UserIcon = ({ className = 'w-4 h-4', fill = 'currentColor' }: IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    );
};

export default UserIcon;