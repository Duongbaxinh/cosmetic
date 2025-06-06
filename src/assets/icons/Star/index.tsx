interface StarIconProps {
    className?: string;
    fill?: string;
}

const StarIcon = ({ className = 'w-4 h-4', fill = 'currentColor' }: StarIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={fill}
            className={className}
        >
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
    );
};

export default StarIcon;
