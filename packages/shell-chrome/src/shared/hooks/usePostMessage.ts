import { useLayoutEffect, useCallback } from 'react';

export const usePostMessage = <T>(name: string, cb: (a: T) => void) => {
    const handleMessage = useCallback((evt: MessageEvent) => {
        if (
            evt?.data?.source === 'element-binder-plugin' &&
            evt?.data?.payload?.type === name
        ) {
            cb(evt.data.payload.detail);
        }
    }, [cb, name]);
    useLayoutEffect(() => {
        window.addEventListener('message', handleMessage)

        return () => window.removeEventListener('message', handleMessage)
    }, [handleMessage]);
}
