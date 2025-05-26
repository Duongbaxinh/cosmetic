"use client";
export default function LoadingGradientSpinner({ className }: { className?: string }) {
    return (
        <div className={`w-[30px] h-[30px] animate-spin rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-[2px] ${className}`}>
            <div className="h-full w-full bg-gradient rounded-full "></div>
        </div>
    );
}