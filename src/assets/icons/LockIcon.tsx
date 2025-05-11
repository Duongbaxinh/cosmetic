import { IconProps } from "@/types";

const LockIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => (
    <svg fill={fill} viewBox="0 0 24 24" className={className}>
        <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-6h-1V9a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-3 0H9V9a3 3 0 0 1 6 0v2z" />
    </svg>
);

export default LockIcon;