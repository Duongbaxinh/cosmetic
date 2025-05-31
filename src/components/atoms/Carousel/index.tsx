'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { NavigationOptions } from "swiper/types";

function Carousel({ className, customSwipeWrap, customButtonRight,
    customButtonLeft, slidesPerView, direction, breakpoints,
    clickable = false, spaceBetween, loop, enableAutoPlay = false, children
}: {
    className?: string, slidesPerView?: number, breakpoints?: any,
    clickable?: boolean, direction?: "vertical" | "horizontal",
    spaceBetween?: number, customSwipeWrap?: string,
    customButtonLeft?: string, customButtonRight?: string,
    enableAutoPlay?: boolean,
    loop?: boolean, children: any
}) {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        if (
            swiperRef.current &&
            prevRef.current &&
            nextRef.current
        ) {
            setTimeout(() => {
                if (!swiperRef.current?.params?.navigation) return;
                const navigationParams = swiperRef.current.params.navigation as NavigationOptions;
                navigationParams.prevEl = prevRef.current;
                navigationParams.nextEl = nextRef.current;
                swiperRef.current.navigation.destroy();
                swiperRef.current.navigation.init();
                swiperRef.current.navigation.update();
            }, 0);
        }
    }, [swiperRef.current, prevRef.current, nextRef.current]);

    return (
        <div className={`w-full h-full ${className && className}`}>
            <div className="relative w-full h-full mx-auto group">
                <Swiper
                    direction={direction ? direction : "horizontal"}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={spaceBetween || 20}
                    autoplay={enableAutoPlay ? { delay: 3000, disableOnInteraction: false } : false}
                    slidesPerGroupSkip={slidesPerView || 1}
                    pagination={clickable ? { clickable: true } : false}
                    loop={loop ? true : false}
                    slidesPerView={slidesPerView || 1}
                    breakpoints={breakpoints ? { ...breakpoints } : null}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className={`rounded-md h-full ${customSwipeWrap}`}
                >
                    {children}
                </Swiper>

                <button
                    ref={prevRef}
                    className={`absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-pink-100 !w-[30px] !h-[30px] flex justify-center items-center text-pink-500 p-2 rounded-full hover:bg-pink-500 hover:text-white transition opacity-0 group-hover:opacity-100 ${customButtonLeft ? customButtonLeft : ''}`}
                >
                    ❮
                </button>
                <button
                    ref={nextRef}
                    className={`absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-pink-100 !w-[30px] !h-[30px] flex justify-center items-center text-pink-500 p-2 rounded-full hover:bg-pink-500 hover:text-white transition opacity-0 group-hover:opacity-100 ${customButtonRight ? customButtonRight : ''}`}
                >
                    ❯
                </button>
            </div>
        </div>
    );
}

export default Carousel;