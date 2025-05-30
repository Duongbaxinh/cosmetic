import { IconProps } from "@/types";

const LoginIcon = ({ className = "w-4 h-4", fill = "#000000" }: IconProps) => {
    return (
        <svg
            fill={fill}
            viewBox="0 0 24 24"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59z" />
            <path d="M19 3H5c-1.1 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
    );
};

export default LoginIcon;
