'use client'

import AttachmentIcon from '@/assets/icons/AttachmentIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import StarIcon from '@/assets/icons/Star';
import IconButton from '@/components/atoms/IconButton';
import Input from '@/components/atoms/Input';
import Popup from '@/components/atoms/Popup';
import GroupStart from '@/components/organisms/GroupStart';
import { useError } from '@/contexts/error.context';
import { useReviewProductMutation, useSaveImageReviewMutation } from '@/redux/slices/review.slice';
import { OrderProductDetail } from '@/types';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export type ReviewPageType = {
    isReview: boolean,
    setIsReview: Dispatch<SetStateAction<boolean>>,
    productReview: OrderProductDetail | null,
    refetchOrder: any
}
const messageReview: Record<number, { text: string; color: string; icon: string }> = {
    1: { text: "Rất không hài lòng", color: "text-red-500", icon: "😡" },
    2: { text: "Không hài lòng", color: "text-orange-500", icon: "😕" },
    3: { text: "Tạm ổn", color: "text-yellow-500", icon: "😐" },
    4: { text: "Hài lòng", color: "text-lime-500", icon: "😊" },
    5: { text: "Tuyệt vời", color: "text-green-500", icon: "😍" },
};


function ReviewPage({ isReview, setIsReview, productReview, refetchOrder }: ReviewPageType) {
    const { handleError } = useError()
    const [numberStar, setNumberStar] = useState<number>(0);
    const [startHover, setStarHover] = useState<number | null>(0)
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [content, setContent] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [reviewProduct] = useReviewProductMutation()
    const [saveImageReview] = useSaveImageReviewMutation()

    const onDrop = async (acceptedFiles: File[]) => {
        setUploading(true);
        setError(null);
        try {
            const uploadPromises = acceptedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'joyboybeauty'); // Thay bằng preset của bạn
                formData.append('folder', 'JOYBOY');

                const response = await fetch('https://api.cloudinary.com/v1_1/dwu92ycra/image/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                if (response.ok) {
                    return data.secure_url;
                }
                throw new Error(data.error?.message || 'Upload failed');
            });

            const urls = await Promise.all(uploadPromises);
            setImageUrls((prev) => [...prev, ...urls]);

        } catch (err) {
            setError('Tải ảnh thất bại.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
        maxFiles: 10,
    });

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const closeReview = () => {
        setIsReview(false);
        setImageUrls([]);
        setContent('');
        setNumberStar(0);
    }

    const handleSubmit = async () => {
        if (!productReview) return
        if (!content && numberStar === 0) {
            toast.error("Vui lòng nhập nội dung đánh giá của bạn")
            return;
        }
        setUploading(true);
        setError(null);
        try {
            const images = imageUrls.map((img) => (
                {
                    image: img
                }
            ))
            await reviewProduct({ content: content, product_id: productReview.product.id, order_detail_id: productReview.id, rate: numberStar, image_reviews: images }).unwrap()
            await refetchOrder()
            toast.success("Cảm ơn bạn đã đánh giá sản phẩm")
            closeReview()
        } catch (err) {
            console.log("check error::: ", err)
            handleError(err)
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (url: string) => {
        setImageUrls(prev => prev.filter(item => item !== url))
    }
    return (
        <Popup isOpen={isReview} onClose={() => setIsReview(false)}>
            <div className="w-full my-0 mx-auto sm:w-[350px] md:w-[500px] h-fit pb-6 px-2">
                <h1 className='text-[18px] font-[700] leading-[24px] pb-3'>Mức độ hài lòng của bạn</h1>
                <div className="w-full grid grid-cols-2 gap-3">
                    <div className="flex gap-1 pb-3">
                        {Array(5)
                            .fill(0)
                            .map((_, index) => {
                                const starValue = index + 1;
                                const isActive = starValue <= (startHover || numberStar);
                                const colorClass = isActive
                                    ? messageReview[startHover || numberStar]?.color ?? "text-yellow-400"
                                    : "text-amber-100";
                                return (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setStarHover(starValue)}
                                        onMouseLeave={() => setStarHover(null)}
                                        onClick={() => setNumberStar(starValue)}
                                        className="cursor-pointer"
                                    >
                                        <StarIcon className={`w-[30px] h-[30px] ${colorClass}`} />
                                    </div>
                                );
                            })}
                    </div>
                    <div className="flex w-full justify-center items-center gap-2 text-[20px] font-medium">
                        {(() => {
                            const current = startHover || numberStar;
                            if (!current || !messageReview[current]) return null;
                            const { text, color, icon } = messageReview[current];
                            return (
                                <span className={`${color}`}>
                                    {icon} {text}
                                </span>
                            );
                        })()}
                    </div>
                </div>

                <div className="w-full flex flex-col justify-end items-end">
                    <Input
                        value={content}
                        onChange={handleChangeContent}
                        placeholder='Nhập đánh giá của bạn đối với sản phẩm'
                        className='w-full border border-color !rounded-full'
                        classInput='!py-2'
                        tailIcon={
                            <div
                                {...getRootProps()}
                                className={`block rounded-full p-2 cursor-pointer bg-pink-100 ${isDragActive ? 'bg-pink-200' : ''}`}
                            >
                                <input {...getInputProps()} />
                                <AttachmentIcon />
                            </div>
                        }
                    />
                </div>
                {imageUrls.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 ">
                        {imageUrls.map((url, index) => (
                            <div className="relative">
                                <Image key={index} src={url} alt={`Uploaded ${index}`} className="w-16 h-16 object-cover rounded" width={50} height={50} />
                                <IconButton className='absolute top-0 right-0 w-[15px] h-[15px] border-0' onClick={() => handleRemoveImage(url)} icon={<CloseIcon className='w-[10px] h-[10px]' />} />
                            </div>
                        ))}
                    </div>
                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                    className='p-1 w-full bg-gradient rounded-full mt-3 text-white cursor-pointer disabled:opacity-50'
                    onClick={handleSubmit}
                    disabled={uploading}
                >
                    {uploading ? 'Đang gửi...' : 'Gửi đánh giá của bạn'}
                </button>
            </div>
        </Popup >
    );
}

export default ReviewPage;