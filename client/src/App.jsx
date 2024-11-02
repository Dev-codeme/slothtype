import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div className="text-secondary p-3">home</div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
