import { useLayoutEffect, useRef } from "react";
import type { TestState } from "../types/typing";
import TypingWord from "./TypingWord";

interface TypingTextProps {
    targetWords: TestState["targetWords"];
    typedWords: TestState["typedWords"];
    currentTypedWord: TestState["currentTypedWord"];
    currentWordIndex: TestState["currentWordIndex"];
}

export function TypingText({ targetWords, typedWords, currentTypedWord, currentWordIndex }: TypingTextProps) {
    const charRefs = useRef<(HTMLSpanElement | null)[][]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);
    const onCharRefs = (index: number, charIndex:number, element: HTMLSpanElement | null) => {
        charRefs.current[index] ??= []
        charRefs.current[index][charIndex] = element
    }

    useLayoutEffect(() => {
        const currentChars = charRefs.current[currentWordIndex];

        if (!currentChars) return;

        let charElement: HTMLSpanElement | null = null;
        let useRightEdge = false;

        if (currentTypedWord.length > 0) {
            charElement = currentChars[currentTypedWord.length - 1];
            useRightEdge = true;
        } else {
            charElement = currentChars[0];
        }

        const containerRect = containerRef.current?.getBoundingClientRect();
        const charRect = charElement?.getBoundingClientRect();

        if (!containerRect || !charRect || !caretRef.current) return;
        const left = (useRightEdge ? charRect.right : charRect.left) - containerRect.left;
        const top = charRect.top - containerRect.top;
        caretRef.current.style.transform = `translate(${left}px, ${top}px)`;
        caretRef.current.style.height = `${charRect.height}px`;

    }, [currentWordIndex, currentTypedWord]);

    return (
        <div ref={containerRef} className="relative text-2xl font-mono whitespace-pre-wrap">
            {targetWords.map((word, index) => (
                <TypingWord key={index} targetWord={word} typedWord={index < currentWordIndex ? typedWords[index] : index === currentWordIndex ? currentTypedWord : ""} onCharRefs={(charIndex, element) => onCharRefs(index, charIndex, element)} />
            ))}

            <span ref={caretRef} className="absolute w-0.5 bg-current animate-pulse transition-transform duration-75 ease-out"/>
        </div>
    )
}