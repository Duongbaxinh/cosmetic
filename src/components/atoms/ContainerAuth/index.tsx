import React from 'react';

function ContainerAuth({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-4 max-w-full lg:max-w-[1024px] mx-auto">
            {children}

        </div>
    );
}

export default ContainerAuth;