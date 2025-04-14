import { IconProps } from "@/types";

const InboxIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className}>
            <path d="M20 4H4v12h4l2 3h4l2-3h4V4z" />
        </svg>
    );
};

export default InboxIcon;
