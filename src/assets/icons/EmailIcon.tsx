import { IconProps } from "@/types";

const MailIcon = ({ className = 'w-4 h-4', fill = '#000000' }: IconProps) => (
    <svg fill={fill} viewBox="0 0 24 24" className={className}>
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z" />
    </svg>
);

export default MailIcon;