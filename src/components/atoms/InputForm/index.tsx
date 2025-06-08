"use client";
import React, { ForwardedRef, forwardRef } from "react";
import { useFormContext, FieldValues, RegisterOptions } from "react-hook-form";

interface InputProps {
    name?: string;
    htmlFor?: string;
    idFor?: string
    placeholder?: string;
    label?: string;
    className?: string;
    validationRules?: Record<string, any>;
    customErrorMessage?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "number" | "file" | "date";
    defaultValue?: string | number;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    register?: any;
    error?: string;
    onHandleLeadingIcon?: () => void;
    onHandleTrailingIcon?: () => void;
}

const InputForm = forwardRef(
    (
        {
            placeholder,
            label,
            customErrorMessage,
            type = "text",
            defaultValue = "",
            leadingIcon,
            trailingIcon,
            onChange,
            onHandleLeadingIcon,
            onHandleTrailingIcon,
            error,
            className,
            htmlFor,
            idFor,
            ...rest
        }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const handleClear = () => {
            if (onHandleTrailingIcon) onHandleTrailingIcon();
        };

        return (
            <div className="relative w-full mb-4">
                {label && <label htmlFor={htmlFor} className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
                <div className="relative">
                    {leadingIcon && (
                        <div
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={onHandleLeadingIcon}
                        >
                            {leadingIcon}
                        </div>
                    )}
                    <input
                        id={idFor}
                        {...rest}
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        defaultValue={defaultValue}
                        className={`w-full p-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${leadingIcon ? "pl-10" : "pl-3"} ${trailingIcon ? "pr-10" : "pr-3"} ${className}`}
                    />
                    {trailingIcon && (
                        <div
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={handleClear}
                        >
                            {trailingIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-1 italic">
                        {customErrorMessage || (error ?? "") || "This field is required"}
                    </p>
                )}
            </div>
        );
    }
);

InputForm.displayName = "InputForm";

export default InputForm;