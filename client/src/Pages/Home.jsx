import React, { useState, useEffect } from 'react';

export default function Home() {
    const [userInput, setUserInput] = useState("");
    const [highlightedKeys, setHighlightedKeys] = useState({});
    const [lastKeyTime, setLastKeyTime] = useState(0);

    // Handle keyboard input
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key.length === 1) {
                addCharacter(e.key);
            } else if (e.key === "Backspace") {
                deleteCharacter();
            } else if (e.key === " ") {
                addCharacter(" ");
                setHighlightedKeys((prev) => ({ ...prev, " ": true }));
            }
            setHighlightedKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
        };

        const handleKeyRelease = (e) => {
            setHighlightedKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
        };

        window.addEventListener("keydown", handleKeyPress);
        window.addEventListener("keyup", handleKeyRelease);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("keyup", handleKeyRelease);
        };
    }, []);

    // Add character with a typing limit of one per second
    const addCharacter = (char) => {
        const currentTime = Date.now();
        const timeSinceLastKey = currentTime - lastKeyTime;
        console.log(timeSinceLastKey)
        if (timeSinceLastKey < 1000) {
            // Typing too fast, clear user input and reset lastKeyTime
            setUserInput(""); // Clear user input
            setLastKeyTime(currentTime); // Reset time to current time to prevent further fast resets
        } else {
            // If enough time has passed, add the character to user input
            setUserInput((prevInput) => prevInput + char);
            setLastKeyTime(currentTime); // Update lastKeyTime to current time
        }
    };
    

    // Delete character
    const deleteCharacter = () => {
        setUserInput((prevInput) => prevInput.slice(0, -1));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-[#f2e9e4] p-4">
            <h1 style={{ fontFamily: 'Bungee', fontSize: '4rem' }} className="text-4xl font-bold text-[#2c0950] mb-6">SLOTHTYPE</h1>
            <div className="typing-area mb-6">
                <p className={`text-xl p-4 min-w-fit mx-auto h-10 flex items-center justify-center overflow-hidden border-b-2 border-[#4a4e69] ${userInput ? 'text-[#4a4e69]' : 'text-[#6e6e6e]'}`}>
                    {userInput || "start typing..."}
                </p>
            </div>
            <OnScreenKeyboard
                addCharacter={addCharacter}
                deleteCharacter={deleteCharacter}
                highlightedKeys={highlightedKeys}
            />
        </div>
    );
}

// On-Screen Keyboard Component
function OnScreenKeyboard({ addCharacter, deleteCharacter, highlightedKeys }) {
    const keys = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"]
    ];

    return (
        <div className="keyboard-container flex flex-col items-center">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2 mb-2">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => addCharacter(key)}
                            className={`key-button px-4 py-2 rounded ${highlightedKeys[key] ? "bg-[#4a4e69] text-[#f2e9e4]" : "bg-[#9a8c98] text-[#f2e9e4]"}`}
                        >
                            {key.toUpperCase()}
                        </button>
                    ))}
                </div>
            ))}
            <div className="space-x-2 mt-2">
                <button
                    onClick={() => addCharacter(" ")}
                    className={`key-button px-16 py-2 rounded ${highlightedKeys[" "] ? "bg-[#4a4e69] text-[#f2e9e4]" : "bg-[#9c89b8] text-[#f2e9e4]"}`}
                >
                    Space
                </button>
                <button
                    onClick={deleteCharacter}
                    className={`key-button px-4 py-2 rounded ${highlightedKeys["backspace"] ? "bg-[#b8bedd] text-[#f2e9e4]" : "bg-[#3a2e4d] text-[#f2e9e4]"}`}
                >
                    Backspace
                </button>
            </div>
        </div>
    );
}
