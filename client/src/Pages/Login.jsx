import { useState } from "react"

export default function Login() {

    const [ showPassword, setShowPassword ] = useState(false)

    return (
        <div className="h-svh w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center shadow-normal shadow-primary rounded-lg py-7 px-10">
                <h1 className="text-5xl text-secondary m-3 select-none">Login</h1>
                <form className="flex flex-col justify-around items-center gap-3 p-10 text-secondary">
                    <div className="border-2 border-secondary rounded-lg px-2 py-2 w-60">
                        <input className="outline-none bg-transparent" autoFocus type="text" placeholder="username" spellCheck="false" />
                    </div>
                    <div className="border-2 rounded-lg px-2 py-1 w-60 flex border-secondary">
                        <input type={showPassword ? "text" : "password"} placeholder="password" className="outline-none bg-transparent" />
                        <span onClick={() => setShowPassword(old => !old)} className="material-symbols-outlined hover:text-gray-300 rounded-lg duration-150 cursor-default select-none text-xl">visibility</span>
                    </div>
                    <button className="w-fit h-fit border-2 text-lg border-secondary rounded-lg mt-3 px-5 py-2 hover:bg-secondary hover:text-black duration-150">Login</button>
                </form>
            </div>
        </div>
    )
}