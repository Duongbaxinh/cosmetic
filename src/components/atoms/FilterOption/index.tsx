
import { ChevronDownIcon, SearchIcon } from "@/assets/icons";
import { memo, ReactNode, useState } from "react";


interface FilterOptionInterface {
    leftIcon?: any;
    rightIcon?: any;
    placeholder?: string;
    iconSelect?: any;
    customIcon?: string;
    customOption?: string;
    customSelected?: string;
    customTextOption?: string;
    customTextSelected?: string;
    customItemOption?: string;
    children: ReactNode;
    inputSearch?: boolean;
    onChange?: any;
    options?: { id: number; value: string; leftIcon?: any; rightIcon?: any }[];
    className?: string;
    classOption?: string;
    title?: string;
}

function FilterOption({
    customIcon,
    customTextSelected,
    customSelected,
    customOption,
    title,
    iconSelect = <SearchIcon className="text-text w-full h-full" />,
    options,
    className,
    children,
    leftIcon
}: FilterOptionInterface) {
    const [openOption, setOpenOption] = useState<string | boolean>("");
    const handleOpenOption = () => {
        if (openOption === "" || openOption === true) {
            setOpenOption(false);
        } else {
            setOpenOption(true);
        }
    };

    return (
        <div
            className={`${className} flex flex-col justify-start items-start cursor-pointer`}>
            <div
                onClick={handleOpenOption}
                className="w-full flex justify-between items-center gap-[6px] ">
                <div
                    className={`flex items-center gap-1 flex-grow overflow-hidden ${customSelected}`}>
                    {leftIcon && leftIcon}
                    <div
                        className={`text-[13px] font-[700] text-text  leading-[31px] capitalize truncate w-full ${customTextSelected}`}>
                        {title}
                    </div>
                </div>
                {/* <div
                    className={`cursor-pointer ${customIcon} ${openOption ? "animate-rotate" : "animate-rotateContrary"
                        }`}>
                    <ChevronDownIcon />
                </div> */}
            </div>

            <div
                className={`w-full h-auto   
                    ${openOption !== null &&
                    openOption === true &&
                    "animate-dropdown !visible"
                    }
                     ${openOption !== null &&
                    openOption === false &&
                    "animate-uptown hidden "
                    } ${customOption} `}>
                <div className={`w-full`}>{children}</div>
            </div>
        </div>
    );
}

export default memo(FilterOption);
