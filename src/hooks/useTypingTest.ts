import { useCallback, useEffect, useState } from "react";
import type { TestMode, TestState } from "../types/typing";
import { processKey } from "../engine/processKey";
import useInactivityTimer from "./useInactivityTimer";

export function useTypingTest(initialState: TestState, mode: TestMode) {
    const [state, setState] = useState<TestState>(initialState);
    const pauseTest = useCallback(() => {
        setState((prevState) => {
            if (prevState.status !== "running") {
                return prevState;
            }

            return {
                ...prevState,
                status: "paused",
            };
        });
    }, []);

    const { resetTimer, clearTimer } = useInactivityTimer(pauseTest);

    const handleKey = useCallback((key: string) => {
        if (state.status === "completed") {
            return;
        }

        if (key.length === 1 || key === "Backspace") {
            resetTimer();
        }
        setState((prevState) => processKey(prevState, key, mode));
    }, [state.status, mode, resetTimer]);

    const completeTest = useCallback(() => {
        clearTimer();
        setState((prevState) => ({
            ...prevState,
            status: "completed",
        }))
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handleKey(event.key);
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKey]);

    return {
        state,
        handleKey,
        completeTest
    }
}