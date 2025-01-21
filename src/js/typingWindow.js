import { generate } from "random-words";
import { useEffect, useRef, useState } from "react";

export default function TypingWindow() {
    //variable definition
    const modes = [10, 25, 50, 100];
    const [currMode, setCurrMode] = useState(10);
    const [active, setActive] = useState(modes[0]);
    const [text, setText] = useState(generate(10).join(' '));
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [correct, setCorrect] = useState(0);
    const [inCorrect, setInCorrect] = useState(0);

    //add keydown event for backspacing and restarting with enter

    //handles typing and checks accuracy
    const handleTyping = (event) => {
        const chars = document.querySelectorAll('.char');
        let typedChar = event.target.value;
        if (charIndex < chars.length) {
            let currChar = chars[charIndex].innerText;
            if (!isTyping) {
                setIsTyping(true);
            }
            if (typedChar === currChar) {
                setCorrect(correct + 1)
                chars[charIndex].classList.add('text-lime-500');
                setCharIndex(charIndex + 1);
            } else {
                setInCorrect(inCorrect + 1);
                chars[charIndex].classList.add('text-rose-600')
                setCharIndex(charIndex + 1);
            }
        }
        else {
            setIsTyping(false);
        } 
    };

    //add useeffect hook to make time tracking loop and check when run is over

    return (
        <div className='flex flex-col min-h-screen justify-evenly items-center border-2 border-red-300'>
                <div className='flex space-x-4 border-2 border-red-400'>
                    {modes.map(mode => (
                        <button className = {active === mode ? 'border-2' : 'border-2 border-red-300'} onClick = {() => {setActive(mode); setCurrMode(mode); setText(generate(mode).join(' '))} }>
                            {mode}
                        </button>
            ))}
        </div>

        <div className='flex-initial max-w-5xl border-2 border-red-300' onClick = {() => {inputRef.current.focus()}}>
            {Array.from(text).map((letter,index) => (
                <span
                key = {index}
                className = {`char ${index === 0 ? 'active': ''}`}
                >
                    {letter}
                </span>
            ))}
            <input type='text' ref = {inputRef} id = 'inputF' value = {inputValue} onChange = {handleTyping} autoFocus className = 'absolute opacity-0 z-0 w-0' />
        </div>

            <div className='border-2 border-red-300'>

            </div>
        </div>
        
    );
};