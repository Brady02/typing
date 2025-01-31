
import { generate } from "random-words";
import { useEffect, useRef, useState } from "react";
import { generateText } from "./generateText";

//to-do: (outside this current scope)
//theme changing in different menu
//make database and authentication
//make stats page to display history of user scores

export default function TypingWindow() {
    //variable definition
    const modes = [10, 25, 50, 100];
    const [currMode, setCurrMode] = useState(10);
    const [active, setActive] = useState(modes[0]);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const finInputRef = useRef(null);
    const [correct, setCorrect] = useState(0);
    const [inCorrect, setInCorrect] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [testComplete, setTestComplete] = useState(false);
    const [useCapital, setUseCapital] = useState(false);
    const [usePunc, setUsePunc] = useState(false);
    const [useSymbol, setUseSymbol] = useState(false);
    const [text, setText] = useState('');

    //handles typing and checks accuracy
    //add setting so if currchar is a space insert letters until they press space
    //add buttons to add capitilization and puncuation to sentences (maybe code mode that just adds random bracketing and quotations)
    const handleChange = (event) => {
        let typedChar = event.target.value;
        const chars = document.querySelectorAll('.char');
        //console.log(test)
        if (charIndex < chars.length) {
            let currChar = chars[charIndex].innerText;
            if (!isTyping) {
                setIsTyping(true);
            }

            if (typedChar === currChar) {
                chars[charIndex].classList.remove('caret');
                setCorrect(correct + 1)
                chars[charIndex].classList.add('correct');
                setCharIndex(charIndex + 1);
                if (charIndex < chars.length-1) {chars[charIndex+1].classList.add('caret');}
            } else if (typedChar !== currChar) {
                chars[charIndex].classList.remove('caret');
                setInCorrect(inCorrect + 1);
                chars[charIndex].classList.add('incorrect');
                setCharIndex(charIndex + 1);
                if (charIndex < chars.length-1) {chars[charIndex+1].classList.add('caret');}
            }

            if (charIndex === chars.length - 1 && typedChar !== 'Backspace') {
                setIsTyping(false);
                setTestComplete(true);
            }
        }
    }

    const handleKeyDown = (event) => {
        let keyDown = event.key;
        const chars = document.querySelectorAll('.char');
        //let typedChar = event.key;
        if (charIndex < chars.length) {
            if (keyDown === 'Backspace' && charIndex !== 0) {
                chars[charIndex].classList.remove('caret');
                chars[charIndex-1].classList.add('caret');
                if (chars[charIndex-1].classList.contains('correct') && charIndex > 0) {
                    chars[charIndex-1].classList.remove('correct');
                    setCharIndex(charIndex - 1);
                } else if (chars[charIndex-1].classList.contains('incorrect') && charIndex > 0) {
                    chars[charIndex-1].classList.remove('incorrect');
                    setCharIndex(charIndex - 1);
                }
            } else if (keyDown === 'Enter') {
                changeMode(currMode,useCapital,usePunc,useSymbol);
            } 
        }
    }

    //checks reset inputs for finished test page, will add more hotkeys ex replay same words
    const handleFinishInput = (event) => {
        let key = event.key;
        if (key === 'Enter') {
            
            changeMode(currMode, useCapital, usePunc, useSymbol);
        }
    }

    //make some css to combine these strapped tailwind classes into bigger combined so they are easier to handle (only for modified ones)
    const changeMode = (mode, capitals, punctuation, symbol) => {
        if (!testComplete) {
            const charsClear = document.querySelectorAll('.char');
            charsClear[charIndex].classList.remove('caret')
            for (let i = 0; i < charIndex; i++) {
                if (charsClear[i].classList.contains('correct')) {charsClear[i].classList.remove('correct');}
                if (charsClear[i].classList.contains('incorrect')) {charsClear[i].classList.remove('incorrect');}
            }
            inputRef.current.focus();
        }
        setCharIndex(0);
        setTestComplete(false);
        setActive(mode);
        setCurrMode(mode);
        setCorrect(0);
        setInCorrect(0);
        setTimeTaken(0);
        setUseCapital(capitals);
        setUsePunc(punctuation);
        setUseSymbol(symbol);
        setText(generateText(mode, capitals, punctuation, symbol));
        //make cursor tracker to make carot and reset it here
    }

    //swap on click text reload for useeffect parameter update run
    useEffect(() => {
        console.log('useeffect')
        setText(generateText(currMode,useCapital,usePunc,useSymbol));
    },[]); 

    //add useeffect hook to make time tracking loop and check when run is over
    useEffect(() => {
        let interval;
        if (isTyping) {
            interval = setInterval(() => {
                setTimeTaken(timeTaken + 1);
            }, 1000) //runs every second
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    },[timeTaken, isTyping])

    //make mode changer a function that resets everything when you change mode
    if (!testComplete) {
        return (
            <div className='flex flex-col flex-wrap min-h-screen justify-evenly items-center'>
                    <div className='flex space-x-4'>
                        <button className = {`bg-white bg-opacity-0 px-1 rounded-2xl hover:mix-blend-difference  ${useSymbol? 'mix-blend-difference outline bg-opacity-5': ''}`} onClick = {() => {changeMode(currMode, useCapital, usePunc, !useSymbol)}}> Symbols </button>
                        <button className = {`bg-white bg-opacity-0 px-1 rounded-2xl hover:mix-blend-difference ${usePunc? 'mix-blend-difference outline bg-opacity-5' : ''}`} onClick = {() => {changeMode(currMode, useCapital, !usePunc, useSymbol)}}> Puncuation </button>
                        <button className = {`bg-white bg-opacity-0 px-1 rounded-2xl hover:mix-blend-difference ${useCapital ? 'mix-blend-difference outline bg-opacity-5' : ''}`} onClick = {() => {changeMode(currMode, !useCapital, usePunc, useSymbol)}}> Capitals </button>
                        {modes.map(mode => (
                            <button key = {mode} className = {`bg-white bg-opacity-0 px-1 rounded-2xl hover:mix-blend-difference  ${active === mode ? 'mix-blend-difference outline bg-opacity-5' : ''}`} onClick = {() => {changeMode(mode, useCapital, usePunc)}}>
                                {mode}
                            </button>
                ))}
            </div>

            <div className='flex-initial max-w-5xl' onClick = {() => {inputRef.current.focus()}}>
                {Array.from(text).map((letter,index) => (
                    <span
                    key = {index}
                    className = {`char ${index === 0 ? 'active': ''}`}
                    >
                        {letter}
                    </span>
                ))}
                <input type='text' ref = {inputRef} id = 'inputF' value = {inputValue} onChange = {handleChange} onKeyDown = {handleKeyDown} autoFocus className = 'absolute opacity-0 z-0 w-0' />
            </div>

                <div className='border-2 border-red-300'>

                </div>
            </div>
            
        );
    } else {
        //when test is over display finished test page
        return (
            <div className='flex flex-col min-h-screen justify-evenly items-center border-2 border-red-300' onClick = {() => {finInputRef.current.focus()}}> 
                <input type='text' ref = {finInputRef} onKeyDown = {handleFinishInput} autoFocus className = 'absolute opacity-0 z-0 w-0'></input>
                <p>test complete wpm: {(correct/4.9)/(timeTaken/60)}</p>
            </div>
        );
    }
};