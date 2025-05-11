import { IconProps } from "@/types";

const GoogleIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className}>
            <path d="M7.55 2.5C4.48 2.5 2 4.98 2 8.05v7.9C2 19.02 4.48 21.5 7.55 21.5h8.9c3.07 0 5.55-2.48 5.55-5.55V8.05c0-3.07-2.48-5.55-5.55-5.55h-8.9zM6.5 17.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5.5 0c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" />
        </svg>
    );
};
export default GoogleIcon;