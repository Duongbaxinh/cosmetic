import { IconProps } from "@/types";

const AttachmentIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => {
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
            <path d="M21 10v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10m4 8v-9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v9m-6-6v3" />
        </svg>
    );
};

export default AttachmentIcon;