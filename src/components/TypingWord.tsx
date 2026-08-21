interface TypingWordProps {
    targetWord: string;
    typedWord: string;
    onCharRefs: (
        index: number,
        element: HTMLSpanElement | null
    ) => void
}

function TypingWord({ targetWord, typedWord , onCharRefs}: TypingWordProps) {
  return (
    <span className="mr-2">
        {[...targetWord].map((char, index) => (
            <span key={index} ref={(element) => onCharRefs(index, element)} className={`ml-0.5 ${typedWord.length <= index ? 'text-gray-500' : targetWord[index] === typedWord[index] ? 'text-teal-100' : 'text-red-600'}`}>
                {char}
            </span>
        ))}
        {typedWord.length > targetWord.length && (
            [...typedWord.slice(targetWord.length)].map((char, index) => (
                <span key={index + targetWord.length} ref={(element) => onCharRefs(index + targetWord.length, element)} className="text-red-600">
                    {char}
                </span>
            ))
        )}
    </span>
  )
}

export default TypingWord