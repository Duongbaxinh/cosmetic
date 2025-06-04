import { IconProps } from "@/types";

const CartIcon = ({ className = 'w-4 h-4', fill = 'currentColor' }: IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM2 4h1.5l3 10h11l3-10H4.5v-2H2v2zm5.5 12h10.5l-1.5 4H7.5l-1.5-4z" />
        </svg>
    );
};

export default CartIcon;