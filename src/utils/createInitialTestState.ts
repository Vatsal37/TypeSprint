import type { TestDuration, TestMode, TestState } from "../types/typing";
import generateTargetWords from "./generateTargetWords";

interface CreateInitialTestStateOptions {
    mode: TestMode;
    duration: TestDuration;
    punctuation: boolean;
    numbers: boolean;
}

export default function createInitialTestState({ mode, duration, punctuation, numbers }: CreateInitialTestStateOptions): TestState {
    const count = mode === "time" ? duration * 2 : duration;
    const targetWords = generateTargetWords({count, punctuation, numbers});

    return {
        targetWords,
        typedWords: [],
        currentTypedWord: "",
        currentWordIndex: 0,
        correctKeyPresses: 0,
        mistakes: 0,
        status: "idle",
    }
}