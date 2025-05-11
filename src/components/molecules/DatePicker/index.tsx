"use client";
import Select from "@/components/atoms/Select";
import React, { useEffect } from "react";
import { useFormContext, FieldValues } from "react-hook-form";


interface DatePickerProps {
    dayName: string;
    monthName: string;
    yearName: string;
    label?: string;
    validationRules?: Record<string, any>;
}

const DatePicker = ({
    dayName,
    monthName,
    yearName,
    label,
    validationRules = {},
}: DatePickerProps) => {
    const formContext = useFormContext<FieldValues>();

    // Check if formContext is available
    if (!formContext) {
        console.error("DatePicker must be used within a FormProvider");
        return <div className="text-red-500">Error: Form context not found. Wrap DatePicker with FormProvider.</div>;
    }

    const { watch, setValue, formState: { errors } } = formContext;

    // Watch the selected month and year
    const selectedMonth = watch(monthName) || "";
    const selectedYear = watch(yearName) || "";
    const selectedDay = watch(dayName) || "";

    // Function to determine if a year is a leap year
    const isLeapYear = (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    // Function to get the number of days in a month
    const getDaysInMonth = (month: string, year: string): number => {
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (!monthNum || !yearNum) return 31; // Default to 31 if month or year is not selected

        const daysInMonth: { [key: number]: number } = {
            1: 31, // January
            2: isLeapYear(yearNum) ? 29 : 28, // February
            3: 31, // March
            4: 30, // April
            5: 31, // May
            6: 30, // June
            7: 31, // July
            8: 31, // August
            9: 30, // September
            10: 31, // October
            11: 30, // November
            12: 31, // December
        };

        return daysInMonth[monthNum] || 31;
    };

    // Calculate the number of days based on selected month and year
    const maxDays = getDaysInMonth(selectedMonth, selectedYear);

    // Generate options for day, month, and year
    const days = [
        { value: "", label: "Ngày" },
        ...[...Array(maxDays)].map((_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
        })),
    ];

    const months = [
        { value: "", label: "Tháng" },
        ...[...Array(12)].map((_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
        })),
    ];

    const years = [
        { value: "", label: "Năm" },
        ...[...Array(100)].map((_, i) => ({
            value: (2025 - i).toString(),
            label: (2025 - i).toString(),
        })),
    ];

    // Reset day if it's greater than the maximum days in the selected month
    useEffect(() => {
        const dayNum = parseInt(selectedDay, 10);
        if (selectedDay && dayNum > maxDays) {
            setValue(dayName, maxDays.toString());
        }
    }, [selectedMonth, selectedYear, selectedDay, maxDays, dayName, setValue]);

    return (
        <div className="flex gap-8 items-center">
            {label && <p className="block mb-1 text-sm font-medium text-gray-700">{label}</p>}
            <div className="flex space-x-2 items-center">
                <Select
                    name={dayName}
                    options={days}
                />
                <Select
                    name={monthName}
                    options={months}
                />
                <Select
                    name={yearName}
                    options={years}
                />
            </div>
        </div>
    );
};

export default DatePicker;