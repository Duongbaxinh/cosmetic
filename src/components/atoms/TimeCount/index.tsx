'use client'
import { TimeCountProps } from '@/types';
import React, { useEffect, useState } from 'react';

const TimeCount: React.FC<TimeCountProps> = ({ hour = 0, minus = 0, second = 0 }) => {
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState<{ hour: number; minus: number; second: number }>({
        hour,
        minus,
        second,
    });
    const [count, setCount] = useState<number>(60);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const timer = setTimeout(() => {
            setCount((prevCount) => prevCount - 1);

            if (count <= 0 && time.minus > 0) {
                setTime({ ...time, minus: time.minus - 1 });
                setCount(60);
            } else if (count <= 0 && time.minus <= 0 && time.hour > 0) {
                setTime({ ...time, hour: time.hour - 1, minus: 60 });
                setCount(60);
            }

            if (count <= 0 && time.minus <= 0 && time.hour <= 0) {
                setTime({ hour: 0, minus: 0, second: 0 });
                setCount(60);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [count, time, mounted]);

    if (!mounted) {
        return (
            <div className="flex gap-2 justify-center items-center text-red-500">
                <BoxTime time={hour} />
                <span className="font-bold">:</span>
                <BoxTime time={minus} />
                <span className="font-bold">:</span>
                <BoxTime time={second} />
            </div>
        );
    }

    return (
        <div className="flex gap-2 justify-center items-center text-red-500">
            <BoxTime time={time.hour} />
            <span className="font-bold">:</span>
            <BoxTime time={time.minus} />
            <span className="font-bold">:</span>
            <BoxTime time={count} />
        </div>
    );
};

interface BoxTimeProps {
    time: number;
}

const BoxTime: React.FC<BoxTimeProps> = ({ time }) => {
    return (
        <div className="w-[25px] h-[25px] flex items-center justify-center bg-red-500 text-white rounded-sm">
            <span className="font-[700] text-[13px]">{time < 10 ? `0${time}` : time}</span>
        </div>
    );
};

export default TimeCount;
