
import { generate } from "random-words";
export function generateText (currMode, useCapital, usePuncuation, useSymbol) {
    let text = generate(currMode);
    let randNum = Math.floor(Math.random() * (currMode * 0.6)) + (currMode * 0.2);
    let randIndex = [];
    if (useCapital) {
        for (let i = 0; i < randNum; i++) {
            randIndex[i] = Math.floor(Math.random() * currMode);
            text[randIndex[i]] = text[randIndex[i]][0].toUpperCase().concat(text[randIndex[i]].substring(1));
        }
    }
    //generate a random number and use it to choose which punctuation mark to use
    //options (.?!,'")
    const puncOptions = ['.', '?', '!', ',', "'", '"']

    if (usePuncuation) {
        for (let i = 0; i < randNum; i++) {
            let randPunc = Math.floor(Math.random() * puncOptions.length);
            if (!useCapital) {randIndex[i] = Math.floor(Math.random() * currMode);}
            if (randIndex[i] > 0) {
                if (randPunc < 3) {
                    text[randIndex[i]-1] = text[randIndex[i]-1].concat(puncOptions[randPunc]);
                } else if (randPunc > 3) {
                    text[randIndex[i]] = puncOptions[randPunc].concat(text[randIndex[i]], puncOptions[randPunc]);
                } else if (randIndex[i] < currMode){
                    text[randIndex[i]] = text[randIndex[i]].concat(puncOptions[randPunc]);
                }
            }
        }
    }
    //code practice option same as punctuation
    //options ({[$-_+=<>/&&||
    const symbolsOptions = ['()', '[]', '{}', '$', '-', '_', '=', '+', '<', '>', '&', '%', '/', '\\', '&', '*', '|', '~', '`', '#', '@']
    if (useSymbol) {
        for (let i = 0; i < randNum; i++) {
            let randSymbol = Math.floor(Math.random() * symbolsOptions.length);
            let randLocation = Math.floor(Math.random() * currMode);
            if (randSymbol < 3) {
                text[randLocation] = symbolsOptions[randSymbol][0].concat(text[randLocation], symbolsOptions[randSymbol][1]);
            } else if (randLocation < currMode) {
                text[randLocation] = text[randLocation].concat(symbolsOptions[randSymbol]);
            }
        }
    }
    return text.join(' ');
}