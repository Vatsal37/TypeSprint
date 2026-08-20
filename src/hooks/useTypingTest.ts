import { useCallback, useEffect, useState } from "react";
import type { TestMode, TestState } from "../types/typing";
import { processKey } from "../engine/processKey";

export function useTypingTest(initialState: TestState, mode: TestMode) {
    const [state, setState] = useState<TestState>(initialState);

    const handleKey = useCallback((key: string) => {
        setState((prevState) => processKey(prevState, key, mode));
    }, [mode]);

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
    }
}