"use client";
import { ChevronDownIcon } from "@/assets/icons";
import React, { forwardRef } from "react";
import {
    useFormContext,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";

interface SelectProps {
    name: string;
    label?: string;
    options: { value: string | number; label: string }[];
    validationRules?: RegisterOptions;
    customErrorMessage?: string;
    defaultValue?: string | number;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            name,
            label,
            options,
            validationRules = {},
            customErrorMessage,
            defaultValue = "",
        },
        ref
    ) => {
        const formContext = useFormContext<FieldValues>();

        if (!formContext) {
            console.error("Select must be used within a FormProvider");
            return (
                <div className="text-red-500">
                    Error: Form context not found. Wrap Select with FormProvider.
                </div>
            );
        }

        const {
            register,
            formState: { errors },
        } = formContext;

        const {
            ref: registerRef,
            ...restRegister
        } = register(name, validationRules);

        const error = errors[name];

        return (
            <div className="relative w-full">
                {label && (
                    <label className="block whitespace-nowrap text-[13px] font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <div className="relative min-w-[75px] text-[13px]">
                    <select
                        {...restRegister}
                        ref={(e) => {
                            registerRef(e);
                        }}
                        defaultValue={defaultValue}
                        className={`w-full p-1 border rounded text-[13px] text-gray-700
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                          appearance-none bg-white pr-8 transition-colors duration-200
                          ${error ? "border-red-500" : "border-gray-300"}`}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDownIcon />
                    </div>
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

Select.displayName = "Select";

export default Select;
