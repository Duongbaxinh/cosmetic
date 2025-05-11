"use client";
import React, { ForwardedRef, forwardRef } from "react";
import { useFormContext, FieldValues, RegisterOptions } from "react-hook-form";

interface InputProps {
    name: string;
    placeholder?: string;
    label?: string;
    validationRules?: Record<string, any>;
    customErrorMessage?: string;
    type?: "text" | "number" | "file" | "date";
    defaultValue?: string | number;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onHandleLeadingIcon?: () => void;
    onHandleTrailingIcon?: () => void;
}

const InputForm = forwardRef(
    (
        {
            name,
            placeholder,
            label,
            validationRules = {},
            customErrorMessage,
            type = "text",
            defaultValue = "",
            leadingIcon,
            trailingIcon,
            onHandleLeadingIcon,
            onHandleTrailingIcon,
        }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const formContext = useFormContext<FieldValues>();

        if (!formContext) {
            console.error("InputForm must be used within a FormProvider");
            return <div className="text-red-500">Error: Form context not found. Wrap InputForm with FormProvider.</div>;
        }

        const { register, formState: { errors }, setValue, watch } = formContext;
        const value = watch(name) || defaultValue;
        const error = errors[name];

        const handleClear = () => {
            setValue(name, "");
            if (onHandleTrailingIcon) onHandleTrailingIcon();
        };

        return (
            <div className="relative w-full mb-4">
                {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
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
                        {...register(name, validationRules as RegisterOptions<FieldValues>)}
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(name, e.target.value)}
                        defaultValue={defaultValue}
                        className={`w-full p-1 border rounded text-[13px] text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 ${error ? "border-red-500" : "border-gray-300"
                            } ${leadingIcon ? "pl-8" : ""}`}
                    />
                    {value && trailingIcon && (
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
                        {customErrorMessage || (error.message as string) || "This field is required"}
                    </p>
                )}
            </div>
        );
    }
);

InputForm.displayName = "InputForm";

export default InputForm;