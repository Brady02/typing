import { generate } from "random-words";
import { useEffect, useRef, useState } from "react";

//to-do: (outside this current scope)
//theme changing in different menu
//make database and authentication
//make stats page to display history of user scores

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
    const [timeTaken, setTimeTaken] = useState(0);

    //handles typing and checks accuracy
    //add setting so if currchar is a space insert letters until they press space
    //add keydown event for backspacing and restarting with enter
    const handleKeyDown = (event) => {
        let typedChar = event.key;
        const chars = document.querySelectorAll('.char');
        //let typedChar = event.target.value;
        if (charIndex < chars.length) {
            let currChar = chars[charIndex].innerText;
            if (!isTyping) {
                setIsTyping(true);
            }
            if (typedChar === 'Backspace' && charIndex > 0) {
                if (chars[charIndex-1].classList.contains('text-lime-500')) {
                    chars[charIndex-1].classList.remove('text-lime-500');
                    setCharIndex(charIndex - 1);
                } else {
                    chars[charIndex-1].classList.remove('text-rose-600');
                    setCharIndex(charIndex - 1);
                }
            } else if (typedChar === 'Enter') {
                changeMode(currMode);
            } else if (typedChar === currChar) {
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
    }

    //make some css to combine these strapped tailwind classes into bigger combined so they are easier to handle (only for modified ones)
    const changeMode = (mode) => {
        const charsClear = document.querySelectorAll('.char');
        for (let i = 0; i < charIndex; i++) {
            if (charsClear[i].classList.contains('text-lime-500')) {charsClear[i].classList.remove('text-lime-500');}
            if (charsClear[i].classList.contains('text-rose-600')) {charsClear[i].classList.remove('text-rose-600');}
        }
        setActive(mode);
        setCurrMode(mode);
        setText(generate(mode).join(' '));
        setCharIndex(0);
        setCorrect(0);
        setInCorrect(0);
        setTimeTaken(0);
        //make cursor tracker to make carot and reset it here
    }
    
    //add useeffect hook to make time tracking loop and check when run is over
    useEffect(() => {
        let interval;
        if (isTyping) {
            interval = setInterval(() => {
                setTimeTaken(timeTaken + 1);
            }, 1000) //runs every second
        }
    });

    //make mode changer a function that resets everything when you change mode

    return (
        <div className='flex flex-col min-h-screen justify-evenly items-center border-2 border-red-300'>
                <div className='flex space-x-4 border-2 border-red-400'>
                    {modes.map(mode => (
                        <button className = {active === mode ? 'border-2' : 'border-2 border-red-300'} onClick = {() => {changeMode(mode)}}>
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
            <input type='text' ref = {inputRef} id = 'inputF' value = {inputValue} onKeyDown = {handleKeyDown} autoFocus className = 'absolute opacity-0 z-0 w-0' />
        </div>

            <div className='border-2 border-red-300'>

            </div>
        </div>
        
    );
};