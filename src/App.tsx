import { useCallback, useEffect, useState } from "react";
import TestFooter from "./components/TestFooter";
import TestHeader from "./components/TestHeader";
import { TypingText } from "./components/TypingText";
import { useTypingTest } from "./hooks/useTypingTest";
import type { TestDuration, TestMode, TestState } from "./types/typing";
import useTestTimer from "./hooks/useTestTimer";
import createInitialTestState from "./utils/createInitialTestState";

function App() {
  const [mode, setMode] = useState<TestMode>("time");
  const [duration, setDuration] = useState<TestDuration>(30);
  const [initialState, setInitialState] = useState<TestState>(() => createInitialTestState({ mode, duration, punctuation: false, numbers: false }));
  const { state, completeTest, clearTimer: clearInactivityTimer } = useTypingTest(initialState, mode);
  const { remainingTime, resetTimer: resetTestTimer } = useTestTimer(mode, duration, state.status);


  useEffect(() => {
    if (remainingTime === 0 && state.status === "running") {
      completeTest();
    }
  }, [remainingTime, state.status, completeTest]);

  const restartTypingTest = useCallback((testMode: TestMode, testDuration: TestDuration) => {
    setInitialState(createInitialTestState({ mode: testMode, duration: testDuration, punctuation: false, numbers: false }));
  }, []);

  const restartTest = useCallback((testMode: TestMode, testDuration: TestDuration) => {
    clearInactivityTimer();
    resetTestTimer();
    restartTypingTest(testMode, testDuration);
    console.count("RESTART TEST");
    console.trace("RESTART SOURCE");
  }, [clearInactivityTimer, resetTestTimer, restartTypingTest]);

  const handleModeChange = useCallback((newMode: TestMode) => {
    setMode(newMode);
    restartTest(newMode, duration);
  }, [restartTest, duration]);

  const handleDurationChange = useCallback((newDuration: TestDuration) => {
    setDuration(newDuration);
    restartTest(mode, newDuration);
  }, [restartTest, mode]);


  return (
    <>
      <div className="h-screen w-screen overflow-y-hidden bg-indigo-950">
        <h1 className="font-bold text-6xl text-center mt-8">TypeSprint</h1>
        <div className="h-full flex justify-center place-items-center">
          <div className="flex flex-col gap-4 justify-center">
            {state.status !== "running" ? <TestHeader mode={mode} onModeChange={handleModeChange} duration={duration} onDurationChange={handleDurationChange}/> : mode === "time" && <span className="text-5xl text-amber-400 font-bold transition-all ease-in-out duration-100">{remainingTime}</span>}
            
            <TypingText 
              targetWords={state.targetWords} 
              typedWords={state.typedWords} 
              currentTypedWord={state.currentTypedWord} 
              currentWordIndex={state.currentWordIndex}
              status={state.status}
            />
            <TestFooter onRestart={() => {console.log("FOOTER CLICK"); restartTest(mode, duration)}}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App