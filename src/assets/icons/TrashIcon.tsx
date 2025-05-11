import { IconProps } from "@/types";

const TrashIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => (
    <svg fill={fill} viewBox="0 0 24 24" className={className}>
        <path d="M6 7h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zm3 3v8h2v-8H9zm4 0v8h2v-8h-2zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
);

export default TrashIcon;