import React from 'react';
import './style.css'
function LoadingPage({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full flex items-center justify-center ${className ? className : ''}`}>
            <div className="load "></div>
        </div>
    );
}

export default LoadingPage;