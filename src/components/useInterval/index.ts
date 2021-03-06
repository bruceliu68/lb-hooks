import { useEffect, useRef } from 'react';

type DelayType = number | null | undefined;

function useInterval(
    fn: () => void,
    delay: DelayType,
    options?: {
        immediate?: boolean
    }
): void {
    const immediate = options?.immediate;
    const timerRef = useRef<() => void>();
    timerRef.current = fn;

    useEffect(() => {
        if (delay === undefined || delay === null) return;
        if (immediate) {
            timerRef.current?.();
        }
        const timer = setInterval(() => {
            timerRef.current?.();
        }, delay);

        return () => {
            clearInterval(timer);
        }
    }, [delay]);
}

export default useInterval;