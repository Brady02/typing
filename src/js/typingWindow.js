import { generate } from "random-words";
import { useState } from "react";


const modes = [10, 25, 50, 100];

export default function TypingWindow() {
    const [currMode, setCurrMode] = useState(10);
    const [active, setActive] = useState(modes[0]);
    return (
        <div class='flex flex-col min-h-screen justify-evenly items-center border-2 border-red-300'>
                <div class='flex space-x-4 border-2 border-red-400'>
                    {modes.map(mode => (
                        <button class = {active === mode ? 'border-2' : 'border-2 border-red-300'} onClick = {() => {setActive(mode); setCurrMode(mode)} }>
                            {mode}
                        </button>
            ))}
        </div>

        <div class='flex-initial max-w-5xl text-3xl leading-relaxed tracking-wide font-medium border-2 border-red-300'>
        {generate(currMode).join(' ')}
        </div>

            <div class='border-2 border-red-300'>

            </div>
        </div>
        
    );
};