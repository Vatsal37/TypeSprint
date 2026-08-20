import type { TestMode, TestState } from "../types/typing";

const isAllowedKey = (key: string): boolean => {
  return key.length === 1 || key === "Backspace";
}

export function processKey(state: TestState, key: string, mode: TestMode): TestState {
    if(!isAllowedKey(key) || state.status === "completed") {
        return state;
    }

    let newState: TestState = state;
    if (state.status === "idle" || state.status === "paused") {
        newState = {...newState, status: "running"};
    }

    if (key.length === 1 && key !== " ") {
        const targetWord = newState.targetWords[newState.currentWordIndex];
        const charIndex = newState.currentTypedWord.length;
        if ((charIndex >= targetWord.length) || (key !== targetWord[charIndex])) {
            newState = {
                ...newState,
                mistakes: newState.mistakes + 1,
            };
        } else {
            newState = {
                ...newState,
                correctKeyPresses: newState.correctKeyPresses + 1,
            };
        }
        newState = {
            ...newState,
            currentTypedWord: newState.currentTypedWord + key,
        };
    } else if (key === "Backspace") {
        if (newState.currentTypedWord.length > 0) {
            newState = {
                ...newState,
                currentTypedWord: newState.currentTypedWord.slice(0, -1),
            };
        } else {
            const prevIndex = newState.currentWordIndex - 1;
            if (prevIndex >= 0 && newState.typedWords[prevIndex] !== newState.targetWords[prevIndex]) {
                newState = {
                    ...newState,
                    currentTypedWord: newState.typedWords[prevIndex],
                    currentWordIndex: prevIndex,
                    typedWords: newState.typedWords.slice(0, prevIndex),
                }
            }
        }
    } else {
        if (newState.currentTypedWord.length > 0) {
            if (newState.currentTypedWord.length < newState.targetWords[newState.currentWordIndex].length) {
                newState = {
                    ...newState,
                    mistakes: newState.mistakes + 1,
                }
            }
            newState = {
                ...newState,
                typedWords: [...newState.typedWords, newState.currentTypedWord],
                currentTypedWord: "",
                currentWordIndex: newState.currentWordIndex + 1,
            }

            if (newState.currentWordIndex >= newState.targetWords.length) {
                if (mode === "words") {
                    newState = {
                        ...newState,
                        status: "completed",
                    }
                } else {
                    // will write timer logic later
                }
            }
        }
    }

    return newState;
}