type TestMode = "time" | "words";

type TestDuration = 15 | 30 | 60 | 120 | 180 | 300;

type TestStatus = "idle" | "running" | "paused" | "completed";

interface TestConfig {
    testMode: TestMode;
    testDuration: TestDuration;
}

interface TestState {
    targetWords: string[];
    typedWords: string[];
    currentTypedWord: string;
    currentWordIndex: number;
    correctKeyPresses: number;
    mistakes: number;
    status: TestStatus;
}

export type {
    TestMode,
    TestDuration,
    TestStatus,
    TestConfig,
    TestState
}