import { useEffect, useState } from "react"
import { client } from "../../client"
import { useNavigate } from "react-router-dom"

export default function Signup() {

    const [ , setSession ] = useState(null)
    const [ disabled, setDisabled ] = useState(false)
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

    async function signup(evt) {
        evt.preventDefault()
        setDisabled(true)

        client.auth.signUp({
          email: evt.target[0].value,
          password: evt.target[1].value
        })
        .then(res => {
            if(res.data.user) return navigate('/');

            if(res.error) console.log(res.error)
            setDisabled(false)
        })
    }      

    return (
        <div className="h-svh w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center shadow-normal shadow-primary rounded-lg py-7 px-10">
                <h1 className="text-5xl text-secondary m-3 select-none">Sign Up</h1>
                <form onSubmit={signup} className="flex flex-col justify-around items-center gap-3 p-10 text-secondary">
                    <input className="outline-none bg-transparent border-2 border-secondary rounded-lg px-2 py-2 w-72" autoFocus autoComplete="email" type="text" placeholder="email" spellCheck="false" />
                    <input className="outline-none bg-transparent border-2 border-secondary rounded-lg px-2 py-2 w-72" type="password" placeholder="password" spellCheck="false" />
                    <input className="outline-none bg-transparent border-2 border-secondary rounded-lg px-2 py-2 w-72" type="password" placeholder="confirm password" spellCheck="false" />
                    <button disabled={disabled} className="w-fit h-fit border-2 text-lg border-secondary rounded-lg mt-3 px-5 py-2 hover:bg-secondary hover:text-black duration-150 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent">{disabled ? "Loading..." : "Register"}</button>
                </form>
            </div>
        </div>
    )
}