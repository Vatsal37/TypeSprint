import { useEffect, useState } from "react";
import TestFooter from "./components/TestFooter";
import TestHeader from "./components/TestHeader";
import { TypingText } from "./components/TypingText";
import { useTypingTest } from "./hooks/useTypingTest";
import type { TestDuration, TestMode, TestState } from "./types/typing";
import useTestTimer from "./hooks/useTestTimer";


function App() {
  const [mode, setMode] = useState<TestMode>("time");
  const [duration, setDuration] = useState<TestDuration>(30);
  const initialState: TestState = {
      targetWords: ["cat", "dog", "hello", "world","cat", "dog", "hello", "world"],
      typedWords: [],
      currentTypedWord: "",
      currentWordIndex: 0,
      correctKeyPresses: 0,
      mistakes: 0,
      status: "idle",
  };
  const { state, completeTest } = useTypingTest(initialState, mode);
  const { remainingTime } = useTestTimer(duration, state.status);

  useEffect(() => {
    if (remainingTime === 0 && state.status === "running") {
      completeTest();
    }
  }, [remainingTime, state.status, completeTest]);


  return (
    <>
      <div className="h-screen w-screen overflow-y-hidden bg-indigo-950">
        <h1 className="font-bold text-6xl text-center mt-8">TypeSprint</h1>
        <div className="h-full flex justify-center place-items-center">
          <div className="flex flex-col gap-4">
            {state.status !== "running" ? <TestHeader mode={mode} onModeChange={setMode} duration={duration} onDurationChange={setDuration}/> : mode === "time" && <span className="text-5xl text-amber-400 font-bold transition-all ease-in-out duration-100">{remainingTime}</span>}
            
            <TypingText 
              targetWords={state.targetWords} 
              typedWords={state.typedWords} 
              currentTypedWord={state.currentTypedWord} 
              currentWordIndex={state.currentWordIndex}
              status={state.status}
            />
            <TestFooter/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App