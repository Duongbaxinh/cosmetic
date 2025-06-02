import React from "react";

interface DiscountTagProps {
    value: string;
}

const Tag: React.FC<DiscountTagProps> = ({ value }) => {
    return (
        <div className="relative inline-block">
            <div className="bg-red-600 text-white text-[10px] h-[22px] px-3 flex items-center rounded-r-md">
                {`${value} %`}
            </div>
            <div
                className="bg-red-600 absolute -left-[8px] top-1/2 -translate-y-1/2 rotate-45"
                style={{ width: "15.56px", height: "15.56px" }}
            ></div>
        </div>

    );
};

export default Tag;
