'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { NavigationOptions } from "swiper/types";

function Carousel({ className, slidesPerView, breakpoints, clickable = false, spaceBetween, children }: {
    className?: string, slidesPerView?: number, breakpoints?: any, clickable?: boolean, spaceBetween?: number, children: any
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
                swiperRef.current.navigation.destroy(); // reset trước
                swiperRef.current.navigation.init(); // init lại
                swiperRef.current.navigation.update(); // update
            }, 0);
        }
    }, [swiperRef.current, prevRef.current, nextRef.current]);

    return (
        <div className={`w-full max-h-fit ${className}`}>
            <div className="relative w-full h-full mx-auto">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={spaceBetween || 20}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    slidesPerGroupSkip={slidesPerView || 1}
                    pagination={clickable ? { clickable: true } : false}
                    loop
                    slidesPerView={slidesPerView || 1}
                    breakpoints={breakpoints ? { ...breakpoints } : null}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className="rounded-lg shadow-lg"
                >
                    {children}
                </Swiper>

                <button
                    ref={prevRef}
                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
                >
                    ❮
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
                >
                    ❯
                </button>
            </div>
        </div>
    );
}

export default Carousel;
