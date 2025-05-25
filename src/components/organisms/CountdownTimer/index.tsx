import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetTime: string; // Format: "YYYY-MM-DDTHH:mm:ssZ"
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetTime) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTime]);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="w-full bg-white py-2 px-4 rounded-lg flex justify-center space-x-4 text-center text-pink-600">
            <div className='flex items-center gap-2 text-3 font-[700] leading-[17px]'>
                <span className="text-2xl font-bold ">{formatNumber(timeLeft.days)}</span>
                <span className="block text-sm uppercase">Ngày</span>
            </div>
            <div className='flex items-center gap-2 text-3 font-[700] leading-[17px]'>
                <span className="text-2xl font-bold ">{formatNumber(timeLeft.hours)}</span>
                <span className="block text-sm uppercase">Giờ</span>
            </div>
            <div className='flex items-center gap-2 text-3 font-[700] leading-[17px]'>
                <span className="text-2xl font-bold ">{formatNumber(timeLeft.minutes)}</span>
                <span className="block text-sm uppercase">Phút</span>
            </div>
            <div className='flex items-center gap-2 text-3 font-[700] leading-[17px]'>
                <span className="text-2xl font-bold ">{formatNumber(timeLeft.seconds)}</span>
                <span className="block text-sm uppercase">Giây</span>
            </div>
        </div>
    );
};

export default CountdownTimer;