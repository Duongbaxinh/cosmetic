'use client'

import AttachmentIcon from '@/assets/icons/AttachmentIcon';
import FilterIcon from '@/assets/icons/FilterIcon';
import Input from '@/components/atoms/Input';
import Popup from '@/components/atoms/Popup';
import GroupStart from '@/components/organisms/GroupStart';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export type ReviewPageType = {
    isReview: boolean,
    setIsReview: Dispatch<SetStateAction<boolean>>
}

function ReviewPage({ isReview, setIsReview }: ReviewPageType) {
    const [numberStar, setNumberStar] = useState<number>(0);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [content, setContent] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                console.log("check data review ", data)
                if (response.ok) {
                    return data.secure_url;
                }
                throw new Error(data.error?.message || 'Upload failed');
            });

            const urls = await Promise.all(uploadPromises);
            setImageUrls((prev) => [...prev, ...urls]);
            console.log('Uploaded URLs:', urls);
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

    const handleSubmit = async () => {
        if (!content && numberStar === 0) {
            toast.error("Vui lòng nhập nội dung đánh giá của bạn")
            return;
        }
        setUploading(true);
        setError(null);
        try {
            console.log('Submitting review:', { content, numberStar, imageUrls });
            setIsReview(false);
            setImageUrls([]);
            setContent('');
            setNumberStar(0);
        } catch (err) {
            setError('Đã xảy ra lỗi khi gửi đánh giá.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Popup isOpen={isReview} onClose={() => setIsReview(false)}>
            <div className="w-full my-0 mx-auto sm:w-[350px] md:w-[500px] h-fit">
                <h1 className='text-[18px] font-[700] leading-[24px] pb-3'>Mức độ hài lòng của bạn</h1>
                <div className="relative h-[50px]">
                    <GroupStart
                        starActive={numberStar}
                        className='absolute top-0 left-0'
                        customStar='w-[30px] h-[30px]'
                    />
                    <GroupStart
                        starActive={numberStar}
                        className='absolute top-0 left-0 opacity-0'
                        customStar='w-[30px] h-[30px]'
                        onHover={setNumberStar}

                    />
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
                    <div className="mt-2 flex flex-wrap gap-2">
                        {imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Uploaded ${index}`} className="w-16 h-16 object-cover rounded" />
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
        </Popup>
    );
}

export default ReviewPage;