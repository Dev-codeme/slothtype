import { useState, useEffect } from 'react';
import { client } from '../../client';
import { Link } from 'react-router-dom'

export default function Home() {

    const [userInput, setUserInput] = useState("");
    const [highlightedKeys, setHighlightedKeys] = useState({});
    const [lastKeyTime, setLastKeyTime] = useState(0);
    const [ session, setSession ] = useState(client.auth.getUser())
    const [ logoutLoading, setLogoutLoading ] = useState(false)

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

        client.auth.getSession()
        .then(({ data }) => {
            setSession(data)
        })

        const { data: authListener } = client.auth.onAuthStateChange((_evt, session) => {
            setSession(session)
        })

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("keyup", handleKeyRelease);
            authListener.subscription.unsubscribe()
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

    const logout = () => {
        setLogoutLoading(true)
        client.auth.signOut()
        .then(() => {
            setLogoutLoading(false)
        })
    }

    return (
        <div>
            <div className='flex p-5 justify-between'>
                <h1 className="text-3xl font-poppins text-secondary select-none opacity-60">slothtype</h1>
                {session ?
                <button disabled={logoutLoading} onClick={logout} className='border-2 rounded-md mx-1 px-3 py-1 border-primary text-primary hover:bg-rose-4s0an0 hover:border-rose-400 hover:text-black duration-150 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent'>Logout</button>
                    :
                <div className='flex items-center opacity-80'>
                    <Link to='/login' className='border-2 rounded-md mx-1 px-3 py-1 border-primary text-primary hover:bg-primary hover:text-black duration-150'>Login</Link>
                    <Link to='/signup' className='border-2 rounded-md mx-1 px-3 py-1 border-primary text-primary hover:bg-primary hover:text-black duration-150'>Signup</Link>
                </div>
                }
            </div>
            <div className="flex flex-col items-center justify-around h-screen text-center overflow-x-hidden">
                <div>
                    <p className='flex gap-0 p-4'>
                        <pre id='finished' className={`text-5xl text-opacity-60 text-primary relative left-[45%] min-w-fit mx-auto h-10 flex items-center justify-center select-none`}>Lorem </pre>
                        <pre id='unfinished' className={`text-5xl text-primary relative left-[45%] min-w-fit mx-auto h-10 flex items-center justify-center select-none`}>
                            ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptatum labore? Distinctio, qui praesentium sint eos repellat recusandae accusamus sunt exercitationem blanditiis perspiciatis! Esse facilis sequi sint necessitatibus nostrum perspiciatis.
                        </pre>
                    </p>
                </div>
                <OnScreenKeyboard
                    addCharacter={addCharacter}
                    deleteCharacter={deleteCharacter}
                    highlightedKeys={highlightedKeys}
                />
            </div>
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
        <div className="keyboard-container flex flex-col items-center select-none opacity-50">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2 mb-2">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => addCharacter(key)}
                            className={`key-button px-4 py-2 rounded border-2 border-secondary text-secondary hover:bg-secondary hover:text-black`}
                        >
                            {key.toUpperCase()}
                        </button>
                    ))}
                </div>
            ))}
            <div className="space-x-2 mt-2">
                <button
                    onClick={() => addCharacter(" ")}
                    className="key-button px-16 py-2 rounded border-2 border-secondary text-secondary hover:bg-secondary hover:text-black"
                >
                    Space
                </button>
                <button
                    onClick={deleteCharacter}
                    className="key-button px-4 py-2 rounded border-2 border-secondary text-secondary hover:bg-secondary hover:text-black"
                >
                    Backspace
                </button>
            </div>
        </div>
    );
}
