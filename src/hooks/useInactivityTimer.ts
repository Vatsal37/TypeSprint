import { useCallback, useEffect, useRef,  } from "react";

export default function useInactivityTimer(onInactive: () => void) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimer = useCallback(() => {

        timerRef.current && clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            onInactive();
        }, 5000)

    }, [onInactive]);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return { resetTimer, clearTimer };
}