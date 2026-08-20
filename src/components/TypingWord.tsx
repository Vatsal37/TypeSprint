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
            <span key={index} ref={(element) => onCharRefs(index, element)} className={`${typedWord.length <= index ? 'text-gray-500' : targetWord[index] === typedWord[index] ? 'text-green-500' : 'text-red-500'}`}>
                {char}
            </span>
        ))}
        {typedWord.length > targetWord.length && (
            [...typedWord.slice(targetWord.length)].map((char, index) => (
                <span key={index + targetWord.length} ref={(element) => onCharRefs(index + targetWord.length, element)} className="text-red-500">
                    {char}
                </span>
            ))
        )}
    </span>
  )
}

export default TypingWord