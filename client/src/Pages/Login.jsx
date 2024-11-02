
export default function Login() {

    return (
        <div className="h-svh w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-lg py-7 px-10">
                <h1 className="text-5xl text-white m-3 select-none">Login</h1>
                <form className="flex flex-col justify-around items-center gap-3 p-10">
                    <div className="border-2 rounded-lg px-2 py-1"><input autoFocus type="text" placeholder="username" className="outline-none bg-transparent text-white" /></div>
                    <div className="border-2 rounded-lg px-2 py-1"><input type="password" placeholder="password" className="outline-none bg-transparent text-white" /></div>
                    <button className="w-fit h-fit border-2 border-white rounded px-3 py-1 hover:bg-white hover:text-black text-white duration-150">Login</button>
                </form>
            </div>
        </div>
    )
}