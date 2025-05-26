import IconButton from '@/components/atoms/IconButton';
import React from 'react';

export type NotFoundType = {
    content: string,
    labelButton?: string,
    onFc?: () => void,
    className?: string,
}
function NotFound({ content, labelButton, onFc, className }: NotFoundType) {
    return (
        <div className={`w-full h-full flex flex-col items-center justify-start ${className ? className : ''}`}>
            <h1>{content}</h1>
            {onFc && (<IconButton onClick={onFc} title={labelButton} />)}
        </div>
    );
}

export default NotFound;