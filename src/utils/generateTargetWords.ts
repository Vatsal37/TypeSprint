import english from "../data/english.json";
import englishPunctuation from "../data/english_contractions.json";
import integers from "../data/numbers_10_999.json";

export interface WordGenerationOptions {
  count: number;
  punctuation: boolean;
  numbers: boolean;
}

export default function generateTargetWords({ count, punctuation, numbers }: WordGenerationOptions): string[] {
    const wordPool = [
        ...english.words,
        ...(punctuation ? englishPunctuation.words : []),
        ...(numbers ? integers : [])
    ]
    
    const words: string[] = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * wordPool.length);
        words.push(wordPool[randomIndex]);
    }

    return words;
}