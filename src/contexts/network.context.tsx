'use client';

import { redirect } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

const NetworkStatusContext = createContext<boolean>(true);

export const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        setIsOnline(navigator.onLine);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <NetworkStatusContext.Provider value={isOnline}>
            {isOnline ? <>
                {children}
            </> : (
                <h1>Error Net</h1>
            )}

        </NetworkStatusContext.Provider>
    );
};

export const useNetworkStatus = () => useContext(NetworkStatusContext);
