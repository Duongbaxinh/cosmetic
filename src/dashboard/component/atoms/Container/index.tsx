import React, { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
    return (
        <div className="w-full md:px-[30px] px-[10px] mr-y-0 mx-auto my-0">
            {children}
        </div>
    );
}

export default Container;
