
import { generate } from "random-words";
export function generateText (currMode, useCapital, usePunctuation) {
    let text = generate(currMode);
    let randNum = Math.floor(Math.random() * (currMode * 0.6)) + (currMode * 0.2);
    let randIndex = [];
    if (useCapital) {
        for (let i = 0; i < randNum; i++) {
            randIndex[i] = Math.floor(Math.random() * currMode);
            text[randIndex[i]] = text[randIndex[i]][0].toUpperCase().concat(text[randIndex[i]].substring(1));
        }
    }
    return text.join(' ');
}