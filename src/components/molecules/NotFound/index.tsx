import IconButton from '@/components/atoms/IconButton';
import React from 'react';

export type NotFoundType = {
    content: string,
    labelButton?: string,
    onFc?: () => void
}
function NotFound({ content, labelButton, onFc }: NotFoundType) {
    return (
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <h1>{content}</h1>
            {onFc && (<IconButton onClick={onFc} title={labelButton} />)}
        </div>
    );
}

export default NotFound;