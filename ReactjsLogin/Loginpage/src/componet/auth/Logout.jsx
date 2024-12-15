import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate=useNavigate();
useEffect(()=>{
    localStorage.removeItem("token")

    navigate("/login");
},[])
    
  return (
    <div>
      Logout is Success !!!
    </div>
  )
}

export default Logout
