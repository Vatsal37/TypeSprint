import { useEffect, useState } from "react";
import type { TestStatus } from "../types/typing";

export default function useTestTimer(duration: number, status: TestStatus) {
    const [remainingTime, setRemainingTime] = useState(duration);
    
    useEffect(() => {
        setRemainingTime(duration);
    }, [duration]);

    useEffect(() => {
        if (status !== "running") {
            return;
        }

        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [status]);

    return { remainingTime };
}