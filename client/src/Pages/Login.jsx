import { useEffect, useState } from "react"
import { client } from "../../client"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const [ showPassword, setShowPassword ] = useState(false)
    const [ , setSession ] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        client.auth.getSession()
        .then(({ data }) => {
            setSession(data)
        })

        const { data: authListener } = client.auth.onAuthStateChange((_evt, session) => {
            setSession(session)
        })

        return () => authListener.subscription.unsubscribe()
    }, [])

    async function login(evt) {
        evt.preventDefault()
        client.auth.signInWithPassword({
          email: evt.target[0].value,
          password: evt.target[1].value
        })
        .then(res => {
            if(res.data.user) return navigate('/');

            if(res.error) console.log(res.error)
        })
    }      

    return (
        <div className="h-svh w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center shadow-normal shadow-primary rounded-lg py-7 px-10">
                <h1 className="text-5xl text-secondary m-3 select-none">Login</h1>
                <form onSubmit={login} className="flex flex-col justify-around items-center gap-3 p-10 text-secondary">
                    <div className="border-2 border-secondary rounded-lg px-2 py-2 w-72">
                        <input className="outline-none bg-transparent w-full" autoFocus autoComplete="off" type="text" placeholder="email" spellCheck="false" />
                    </div>
                    <div className="border-2 rounded-lg px-2 py-1 w-72 flex border-secondary">
                        <input type={showPassword ? "text" : "password"} placeholder="password" className="outline-none bg-transparent w-full" />
                        <span onClick={() => setShowPassword(old => !old)} className="material-symbols-outlined hover:text-gray-300 rounded-lg duration-150 cursor-default select-none text-xl">visibility</span>
                    </div>
                    <button className="w-fit h-fit border-2 text-lg border-secondary rounded-lg mt-3 px-5 py-2 hover:bg-secondary hover:text-black duration-150">Login</button>
                </form>
                <span className="text-secondary">Don&apos;t have an account? <Link to='/signup' className="text-cyan-300 hover:underline underline-offset-2">Sign Up!</Link></span>
            </div>
        </div>
    )
}