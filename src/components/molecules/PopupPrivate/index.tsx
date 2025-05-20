"use client";
import { useRouter } from 'next/navigation';
import { LOGIN_URL } from '@/routers';
import Popup from '@/components/atoms/Popup';
import IconButton from '@/components/atoms/IconButton';
import CloseIcon from '@/assets/icons/CloseIcon';

export type PopupPrivateType = {
    isOpen: boolean;
    onClose: () => void;
};

function PopupPrivate({ isOpen, onClose }: PopupPrivateType) {
    const router = useRouter();

    const handlePopup = (type: "cancel" | "continue") => {
        if (type === "cancel") {
            onClose();
        } else {
            router.push(LOGIN_URL);
        }
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} title="Thông báo">
            <div className="space-y-4 px-2 py-1">
                <p className="text-gray-700 text-sm">
                    Vui lòng đăng nhập trước khi mua hàng.
                </p>
                <div className="flex justify-between gap-3">
                    <IconButton
                        icon={<CloseIcon />}
                        title="Hủy"
                        onClick={() => handlePopup("cancel")}
                        className="border border-gray-300 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded"
                    />
                    <IconButton
                        title="Tiếp tục"
                        onClick={() => handlePopup("continue")}
                        className="bg-blue-600 border border-gray-300  hover:bg-blue-700 px-3 py-2 rounded"
                    />
                </div>
            </div>
        </Popup>
    );
}

export default PopupPrivate;
