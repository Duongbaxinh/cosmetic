"use client";
import { ErrorContextType } from "@/types";
import React, { createContext, ReactNode, useContext } from "react";
import { toast } from "react-toastify";

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    type RTKError = {
        status: number | string;
        data?: any;
    };

    function handleRTKError(error: unknown): string {
        const defaultMessage = "Đã có lỗi xảy ra. Vui lòng thử lại.";

        if (!error || typeof error !== "object") {
            toast.error(defaultMessage);
            return defaultMessage;
        }

        const rtkError = error as RTKError;

        let message = defaultMessage;

        if (rtkError.status === "FETCH_ERROR") {
            message = "Không thể kết nối đến máy chủ. Kiểm tra kết nối mạng.";
        } else if (rtkError.status === "TIMEOUT_ERROR") {
            message = "Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại sau.";
        } else if (typeof rtkError.status === "number") {
            if (rtkError.status === 400) message = "Yêu cầu không hợp lệ.";
            else if (rtkError.status === 401) message = "Hãy xem lại thông tin đăng nhập của bạn.";
            else if (rtkError.status === 403) message = "Bạn không có quyền truy cập.";
            else if (rtkError.status === 404) message = "Không tìm thấy tài nguyên.";
            else if (rtkError.status === 500) message = "Lỗi máy chủ. Vui lòng thử lại sau.";
            else if (rtkError.data?.message) message = rtkError.data.message;
        }

        toast.error(message);
        return message;
    }

    return (
        <ErrorContext.Provider
            value={{
                handleError: handleRTKError,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};
