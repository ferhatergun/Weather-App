import Loader from "./components/Loader"
import { useState } from "react"
import { Routes ,Route} from "react-router-dom" 
import Home from "./pages/Home"
import Weather from "./pages/Weather"


function App() {


  return (
    <div className="mx-auto bg-image min-h-screen w-full flex flex-col justify-center items-center p-5">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/weather" element={<Weather/>} />
    </Routes>
    </div>
  )
}

export default App
