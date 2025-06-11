"use client"
import ExpandableText from '@/components/atoms/ExpandableText';
import { comment } from '@/consts';
import { ReviewType } from '@/types';
import { calculateRating } from '@/utils';
import Image from 'next/image';


function ReviewProduct({ review }: { review: ReviewType[] }) {

    const renderStars = (rating: number) => {
        const filledStars = Math.floor(rating);
        const emptyStars = 5 - filledStars;
        return (
            <>
                <span className="text-yellow-500">{Array(filledStars).fill("★").join("")}</span>
                <span className="text-gray-300">{Array(emptyStars).fill("☆").join("")}</span>
            </>
        );
    };
    const ratingDistribution = calculateRating(review || []);
    const reviewBalance = review.flatMap(review => review.rate).reduce((sum, review) => sum + review, 0) / review.length
    const reviewFile = review.flatMap((review) => [...review.image_reviews])
    return (
        <div className="w-full grid grid-cols-3 gap-16 h-fit mx-auto py-6 px-4 bg-white mt-6 border-t border-color">
            <div className="col-span-1">
                {/* Tiêu đề */}
                <h1 className="text-lg font-semibold text-gray-800 mb-4">Khách hàng đánh giá</h1>
                <h1 className='text-md font-semibold text-gray-800 mb-4'>Tổng quan</h1>
                {/* Phần tổng quan */}
                <div className=" flex flex-col  items-start mb-6 gap-5 ">
                    <div className="w-full flex gap-2 ">
                        <div className=" w-1/3 mr-4">
                            <p className="text-3xl font-bold text-yellow-500">{reviewBalance || 0}</p>
                            <div className="flex">{renderStars(reviewBalance)}</div>
                            <p className="text-sm text-gray-600">({review.length} đánh giá)</p>
                        </div>

                        <div className="w-full">
                            {ratingDistribution.map((dist) => (
                                <div key={dist.stars} className="flex items-center mb-1">
                                    <span className="text-yellow-500">{renderStars(dist.stars)}</span>
                                    <div className="w-full bg-gray-200 h-2 ml-2 rounded-full">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{
                                                width: `${review.length > 0
                                                    ? (dist.count / review.length) * 100
                                                    : 0
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span className="ml-2 text-gray-600">{dist.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hiển thị images, video */}
                    <div className="w-full h-full">
                        {reviewFile && reviewFile.length > 0 ? (
                            <div className="flex flex-wrap items-start gap-2">
                                {reviewFile.slice(0, 8).map((image, index) => (
                                    <Image
                                        className="w-[80px] h-[80px] object-cover rounded border-[1px] border-gray-300"
                                        width={80}
                                        height={80}
                                        key={index}
                                        alt={`ReviewType image ${index + 1}`}
                                        src={image.image || "/images/define.png"}
                                    />
                                ))}
                                {reviewFile.length > 10 && (
                                    <div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-200 rounded cursor-pointer">
                                        <span className="text-xl font-bold text-gray-600">+</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>not image</div>
                        )}
                    </div>

                </div>
            </div>

            {/* Danh sách đánh giá */}
            <div className=" col-span-2 space-y-4">
                {review.map((reviewUser, index) => (
                    <div key={index} className="flex items-start">
                        <div className="text-blue-500 mr-2 w-[300px] flex items-start gap-2">
                            <Image src={''} alt='' width={30} height={30} className='object-cover bg-gray-300' />
                            <p className="text-sm font-semibold">{reviewUser.user.username}</p>
                        </div>
                        <div>
                            <div className="flex flex-col justify-start items-start md:flex-row ">
                                <span className="text-yellow-500 text-[13px]">{renderStars(reviewUser.rate)}</span>
                                {/* <span className="text-green-500 text-[13px] ml-2">{reviewUser}</span> */}
                                <span className="text-gray-500 text-[13px] ml-2">{reviewUser.created_at}</span>
                            </div>
                            <ExpandableText content={reviewUser.content.toString()} className='mt-2' />
                            <div className="flex space-x-2 mt-2">
                                {reviewUser.image_reviews.length > 0 && reviewUser.image_reviews.map((image, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={image.image || "/image/defined.png"}
                                        alt={`ReviewType ${imgIndex + 1}`}
                                        className="w-12 h-12 rounded"
                                    />
                                ))}
                            </div>
                            {/* Phản hồi từ JoyBoy Care */}

                            <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                <p className="text-blue-600 font-medium text-[16px]">Joyboy Care</p>
                                <p className="text-gray-700 text-[13px]">{comment}</p>
                            </div>

                        </div>

                    </div>
                ))}
            </div>


        </div >
    );
}


export default ReviewProduct;