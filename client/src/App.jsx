import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<div>home</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
