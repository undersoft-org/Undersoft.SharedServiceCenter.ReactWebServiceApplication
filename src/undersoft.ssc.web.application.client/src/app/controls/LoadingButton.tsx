import React from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "./LoadingSpinner";

type LoadingButtonProps = {
    loading: boolean;
    btnColor?: string;
    textColor?: string;
    children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
    textColor = "text-white",
    btnColor = "bg-ct-yellow-600",
    children,
    loading = false,
}) => {
    return (
        <button
            type="submit"
            className={twMerge(
                `w-full py-3 font-semibold rounded-lg outline-none border-none flex justify-center`,
                `${btnColor} ${loading && "bg-[#ccc]"}`
            )}
        >
            {loading ? (
                <div className="flex items-center gap-3">
                    <LoadingSpinner />
                    <span className="text-slate-500 inline-block">Loading...</span>
                </div>
            ) : (
                <span className={`${textColor}`}>{children}</span>
            )}
        </button>
    );
};