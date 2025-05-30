'use client'
import Image from 'next/image';
import { useState } from 'react';

function Radio() {
    const [value, setValue] = useState('1');

    return (
        <div className="mt-5">
            <div className="flex flex-col gap-5">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="1"
                        checked={value === '1'}
                        onChange={() => setValue('1')}
                        className="mr-2"
                    />
                    <div className="flex items-center gap-2">
                        <Image src="" alt="Receipt Payment" width={20} height={20} className="h-6" />
                        <p>Thanh toán khi nhận hàng</p>
                    </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="2"
                        checked={value === '2'}
                        onChange={() => setValue('2')}
                        className="mr-2"
                    />
                    <div className="flex items-center gap-2">
                        <Image src="" alt="PayPal Payment" className="h-6" width={20} height={20} />
                        <p>Thanh toán bằng MoMo                  </p>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Radio;
