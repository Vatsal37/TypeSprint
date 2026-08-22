import { useCallback, useEffect, useRef, useState } from "react";
import type { TestMode, TestStatus } from "../types/typing";

export default function useTestTimer(mode: TestMode, duration: number, status: TestStatus) {
    const [remainingTime, setRemainingTime] = useState(duration);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    
    useEffect(() => {
        setRemainingTime(duration);
    }, [duration]);

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const resetTimer = useCallback(() => {
        clearTimer();
        setRemainingTime(duration);
    }, [duration, clearTimer]);

    useEffect(() => {
        if (mode !== "time") {
            clearTimer();
            return;
        }
        if (status !== "running") {
            return;
        }

        intervalRef.current = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1) {
                    clearTimer();
                    return 0;
                }

                return prevTime - 1;
            });
        }, 1000);

        return clearTimer;

    }, [mode, status]);

    return { remainingTime, resetTimer };
}