import { generate } from "random-words";
import { useState } from "react";


const modes = [10, 25, 50, 100];

export default function TypingWindow() {
    const [currMode, setCurrMode] = useState(10);
    const [active, setActive] = useState(modes[0]);
    const [text, setText] = useState(generate(10).join(' '));
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    const handleTyping = (event) => {
        let typedChar = event.target.value;
        console.log(typedChar);
        if (charIndex < text.length) {
            let currChar = text[charIndex];
            if (!isTyping) {
                setIsTyping(true);
            }
            if (typedChar === currChar) {
                console.log(typedChar + ', ' + currChar);
            }
        }
    }

    return (
        <div className='flex flex-col min-h-screen justify-evenly items-center border-2 border-red-300'>
                <div className='flex space-x-4 border-2 border-red-400'>
                    {modes.map(mode => (
                        <button className = {active === mode ? 'border-2' : 'border-2 border-red-300'} onClick = {() => {setActive(mode); setCurrMode(mode); setText(generate(mode).join(' '))} }>
                            {mode}
                        </button>
            ))}
        </div>

        <div className='flex-initial max-w-5xl border-2 border-red-300'>
            <p className='text-3xl leading-relaxed tracking-wide font-medium '>
                {text}
            </p>
            <input type='text' onChange={handleTyping} ></input>
        </div>

            <div className='border-2 border-red-300'>

            </div>
        </div>
        
    );
};