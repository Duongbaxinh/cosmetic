import CloseIcon from "@/assets/icons/CloseIcon";
import { ReactNode } from "react";
import IconButton from "../IconButton";
import "./styles.css";

interface Props {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    title?: string;
    subName?: string;
    position?: string;
    onClose?: () => void;
}

export default function Popup({
    className,
    children,
    isOpen,
    title,
    subName,
    position,
    onClose
}: Props) {
    return (
        <div
            onClick={onClose}
            className={`modal w-[100vw] fixed inset-0 z-30  transition flex justify-center items-center  
               ${isOpen ? "show" : ""} ${position}
            `}>
            <div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`min-w-[200px] bg-white flex flex-col gap-[15px] max-h-[90vh] p-[10px] rounded-md ${className}`}>
                    <div className="w-full sticky top-0 bg-white">
                        <div className="w-full flex justify-between">
                            <p className="text-[18px] font-[700] text-text">
                                {title}
                            </p>
                            <IconButton icon={<CloseIcon />}
                                onClick={onClose} />
                        </div>
                    </div>
                    <div className="w-full ">{children}</div>
                </div>
            </div>
        </div>
    );
}
