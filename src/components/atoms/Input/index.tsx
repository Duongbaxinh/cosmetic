"use client";
// import { BoxIcon } from "@/assets/icons";
import React, {
    ForwardedRef,
    forwardRef,
    ReactNode
} from "react";

export enum typeInput {
    TEXT = "text",
    NUMBER = "number",
    FILE = "file",
    DATE = "date",
    PASSWORD = "password",
}
export enum Variant {
    UNDERLINE = "underline",
    OUTLINE = "outline"
}
interface InputInterface {
    type?: typeInput;
    disabled?: boolean;
    placeholder?: string;
    error?: boolean,
    message?: string,
    value?: string | number;
    leadingIcon?: ReactNode;
    tailIcon?: ReactNode;
    tailIconSecond?: ReactNode;
    refInput?: any;
    refSearch?: any;
    onMouseDown?: React.ChangeEventHandler<HTMLInputElement>;
    onClick?: React.ChangeEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.ChangeEventHandler<HTMLInputElement>;
    onHandleLeadingIcon?: any;
    onHandleTailIcon?: VoidFunction;
    onHandleTailIconSecond?: VoidFunction;
    onHandleFocus?: any;
    maxWidth?: string;
    minWidth?: string;
    width?: string;
    height?: string;
    minHeight?: string;
    border?: number;
    borderRadius?: string;
    className?: string;
    classInput?: string;
    defaultValue?: string;
    variant?: "underline" | "outline";
}

const Input = forwardRef(({
    placeholder,
    error,
    message,
    value,
    type = typeInput.TEXT,
    leadingIcon,
    tailIcon,
    tailIconSecond,
    className,
    variant = Variant.OUTLINE,
    onChange,
    disabled = false,
    refInput = null,
    refSearch = null,
    onMouseDown,
    onClick,
    classInput,
    onHandleLeadingIcon,
    onHandleTailIcon,
    onHandleTailIconSecond,
    onHandleFocus,
    defaultValue,
    onBlur,
    ...rest
}: InputInterface,
    ref: ForwardedRef<HTMLInputElement>) => {

    const variantType = {
        underline: `border-b-[0.5px] focus-within:border-b-[2px]`,
        outline:
            "border-[0.5px]   rounded-sm px-2 py-1"
    };
    return (
        <>
            <div
                className={`relative flex justify-start items-center ${variantType[variant]} ${error ? "border-red-400" : "border-green"} relative pt-[7px] pr-[6px] pb-[6px] w-full ${className}`}
                onClick={(e) => e.stopPropagation()}>
                {leadingIcon && (
                    <div
                        className="mx-1  cursor-pointer text-red-500"
                        onClick={onHandleLeadingIcon}>
                        {leadingIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    className={`border-0  outline-none w-full h-full p-0 m-0 text-[13px] leading-[18px] text-text truncate !bg-transparent  ${classInput} `}
                    placeholder={`${placeholder}`}
                    value={value}
                    onChange={onChange}
                    type={`${type ? type : "text"}`}
                    onFocus={onHandleFocus}
                    onBlur={onBlur}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    {...rest}
                />
                {tailIcon && (
                    <div
                        ref={refSearch}
                        className="mx-1  cursor-pointer text-red-500"
                        onClick={onHandleTailIcon}>
                        {tailIcon}
                    </div>
                )}
                {tailIconSecond && (
                    <div
                        ref={refSearch}
                        className="mx-1  cursor-pointer text-red-500"
                        onClick={onHandleTailIconSecond}>
                        {tailIconSecond}
                    </div>
                )}
                <p className={` absolute ${!error ? "hidden " : ""} text-red-500 top-[24px] left-0  text-[12px] italic`}>
                    {message}
                </p>
            </div>

        </>
    );
});

Input.displayName = 'Input';

export default Input;
