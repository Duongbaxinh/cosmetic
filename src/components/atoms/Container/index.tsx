'use client'
import { ContainerProps } from "@/types";
import React from "react";

const Container: React.FC<ContainerProps> = ({
    className,
    children,
    eRef
}) => {
    return (
        <div
            ref={eRef}
            className={` rounded-md max-w-[1440px] my-0 mx-auto ${className} `}
        >
            {children}
        </div>
    );
};

export default Container;
