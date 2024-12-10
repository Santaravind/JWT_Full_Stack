import { useState } from 'react'

import './App.css'
import Loginpage from './componet/Loginpage'
import Registerpage from './componet/Registerpage'
import Dasboard from './componet/Dasboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter> 
    <Routes>
        <Route path="/" element={<Registerpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dasboard />} />
      </Routes>
    
    </BrowserRouter>
    
    
    {/* <div>

      <h1>login and signup</h1>
      <Registerpage/>
      <Loginpage/>
      <Dasboard/>
    </div> */}
     
    </>
  )
}

export default App
