import { AtSign, Clock, Hash, WholeWord } from "lucide-react"
import { useState } from "react";
import type { TestDuration, TestMode } from "../types/typing";

interface TestHeaderProps {
    mode: TestMode
    onModeChange: (newMode: TestMode) => void;
    duration: TestDuration;
    onDurationChange: (newDuration: TestDuration) => void;
}

function TestHeader({ mode, onModeChange, duration, onDurationChange }: TestHeaderProps) {
    const [isPunctuationEnabled, setIsPunctuationEnabled] = useState(false);
    const [isNumbersEnabled, setIsNumbersEnabled] = useState(false);

    const durations: TestDuration[] = [15, 30, 60, 120, 180, 300];
  return (
    <div className="flex text-[1em] justify-between max-w-7xl m-auto gap-8">
        <div className="rounded-lg px-6 py-3 gap-8 flex justify-between items-center bg-slate-700">
            <button 
                className={`flex gap-1.5 justify-between items-center cursor-pointer ${isPunctuationEnabled ? "text-amber-300" : "text-slate-200"}`}
                onClick={() => setIsPunctuationEnabled(!isPunctuationEnabled)}
            >
                <AtSign size={16} /> punctuation
            </button>
            <button
                className={`flex gap-1.5 justify-between items-center cursor-pointer ${isNumbersEnabled ? "text-amber-300" : "text-slate-200"}`}
                onClick={() => setIsNumbersEnabled(!isNumbersEnabled)}                          
            >
                <Hash size={16} /> numbers
            </button>
        </div>

        <div className="rounded-lg px-6 py-3 gap-8 flex justify-between items-center bg-slate-700">
            <button 
                className={`flex gap-1.5 justify-between items-center cursor-pointer ${mode === "time" ? "text-amber-300" : "text-slate-200"}`}
                onClick={() => onModeChange("time")}
            >
                <Clock size={16} /> time
            </button>
            <button 
                className={`flex gap-1.5 justify-between items-center cursor-pointer ${mode !== "time" ? "text-amber-300" : "text-slate-200"}`}
                onClick={() => onModeChange("words")}
            >
                <WholeWord size={16} /> words
            </button>
        </div>

        <div className="rounded-lg px-6 py-3 gap-4 flex justify-between items-center bg-slate-700">
            {durations.map((durationOption, index) => (
                <button
                    key={index}
                    className={`cursor-pointer ${durationOption === duration ? "text-amber-300" : "text-slate-200"}`}
                    onClick={() => onDurationChange(durationOption)}
                >
                    {durationOption}
                </button>
            ))}
        </div>
    </div>
  )
}

export default TestHeader