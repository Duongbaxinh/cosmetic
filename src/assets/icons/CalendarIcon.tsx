import { IconProps } from "@/types";

const CalendarIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className}>
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14h18V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
        </svg>
    );
};

export default CalendarIcon;
