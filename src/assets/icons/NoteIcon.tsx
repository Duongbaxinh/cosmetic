import { IconProps } from "@/types";

const NoteIcon = ({ className = 'w-4 h-4', fill = 'currentColor' }: IconProps) => {
    return (
        <svg fill={fill} viewBox="0 0 24 24" className={className}>
            <path d="M3 3v18h18V8l-5-5H3zm12 7H7V8h8v2zm0 4H7v-2h8v2z" />
        </svg>
    );
};

export default NoteIcon;
