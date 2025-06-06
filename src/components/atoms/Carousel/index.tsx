'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { NavigationOptions } from "swiper/types";

function Carousel({
    className,
    customSwipeWrap,
    customButtonRight,
    customButtonLeft,
    slidesPerView,
    slidesPerGroup = 1,
    direction,
    breakpoints,
    clickable = false,
    spaceBetween,
    loop,
    enableAutoPlay = false,
    slidesPerGroupBreakpoints,
    children
}: {
    className?: string,
    slidesPerView?: number,
    slidesPerGroup?: number,
    breakpoints?: any,
    clickable?: boolean,
    direction?: "vertical" | "horizontal",
    spaceBetween?: number,
    customSwipeWrap?: string,
    customButtonLeft?: string,
    customButtonRight?: string,
    enableAutoPlay?: boolean,
    slidesPerGroupBreakpoints?: Record<any, any>
    loop?: boolean,
    children: any
}) {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [currentSlidesPerGroup, setCurrentSlidesPerGroup] = useState(slidesPerGroup ?? 1);

    useEffect(() => {
        const updateSlidesPerGroup = () => {
            if (slidesPerGroupBreakpoints) {
                const width = window.innerWidth;
                const sorted = Object.entries(slidesPerGroupBreakpoints)
                    .map(([bp, val]) => [parseInt(bp), val] as [number, number])
                    .sort((a, b) => a[0] - b[0]);

                let matched = sorted[0][1];
                for (const [bp, val] of sorted) {
                    if (width >= bp) {
                        matched = val;
                    }
                }
                setCurrentSlidesPerGroup(matched);
            }
        };

        updateSlidesPerGroup();
        window.addEventListener('resize', updateSlidesPerGroup);
        return () => window.removeEventListener('resize', updateSlidesPerGroup);
    }, [slidesPerGroupBreakpoints]);

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
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
    }, []);

    const handleSlideChange = () => {
        if (!swiperRef.current) return;
        setIsBeginning(swiperRef.current.isBeginning);
        setIsEnd(swiperRef.current.isEnd);
    };

    return (
        <div className={`w-full h-full ${className ?? ''}`}>
            <div className="relative w-full h-full mx-auto group">
                <Swiper
                    direction={direction ?? "horizontal"}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={spaceBetween ?? 20}
                    autoplay={enableAutoPlay ? { delay: 2000, disableOnInteraction: false } : false}
                    slidesPerView={slidesPerView ?? 1}
                    slidesPerGroup={currentSlidesPerGroup}
                    pagination={clickable ? { clickable: true } : false}
                    loop={loop ?? false}
                    breakpoints={breakpoints ?? undefined}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onSlideChange={handleSlideChange}
                    className={`rounded-md h-full ${customSwipeWrap ?? ''}`}
                >
                    {children}
                </Swiper>

                <button
                    ref={prevRef}
                    disabled={!loop && isBeginning}
                    className={`
                        absolute top-1/2 left-0 z-10 -translate-y-1/2
                        bg-pink-100 !w-[30px] !h-[30px] flex justify-center items-center
                        text-pink-500 p-2 rounded-full
                        transition opacity-0 group-hover:opacity-100
                        ${!loop && isBeginning ? 'opacity-50 cursor-not-allowed hidden' : 'hover:bg-pink-500 hover:text-white'}
                        ${customButtonLeft ?? ''}
                    `}
                >
                    ❮
                </button>

                <button
                    ref={nextRef}
                    disabled={!loop && isEnd}
                    className={`
                        absolute top-1/2 right-0 z-10 -translate-y-1/2
                        bg-pink-100 !w-[30px] !h-[30px] flex justify-center items-center
                        text-pink-500 p-2 rounded-full
                        transition opacity-0 group-hover:opacity-100
                        ${!loop && isEnd ? 'opacity-50 cursor-not-allowed hidden' : 'hover:bg-pink-500 hover:text-white'}
                        ${customButtonRight ?? ''}
                    `}
                >
                    ❯
                </button>
            </div>
        </div>
    );
}

export default Carousel;
