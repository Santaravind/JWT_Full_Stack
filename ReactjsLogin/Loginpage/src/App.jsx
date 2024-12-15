import { useState } from 'react'


import Loginpage from './componet/auth/Loginpage'
import Registerpage from './componet/Registerpage'
import Dasboard from './componet/pages/Dasboard'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './componet/pages/Home'
import PrivateRoute from './componet/Route/PrivateRoute'
import Header from './componet/pages/Header'
import Footer from './componet/pages/Footer'
import Contect from './componet/pages/Contect'
import Logout from './componet/auth/Logout';

function App() {
  const location = useLocation();
  // Paths without Header and Footer
  const hideHeaderFooter = ["/login", "/register"];
 


  return (
    <>
    {/* Show Header only if the current path is not in `hideHeaderFooter` */}
    {!hideHeaderFooter.includes(location.pathname) && <Header />}

{/* Routes */}
<Routes>
  {/* Login and Register are accessible to everyone */}
  
  
  <Route path="/login" element={<Loginpage />} />
  <Route path="/register" element={<Registerpage />} />
  
  {/* All other routes are protected */}
  <Route
    path="/"
    element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    }
  />
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dasboard />
      </PrivateRoute>
    }
  />
  <Route
    path="/contact"
    element={
      <PrivateRoute>
        <Contect />
      </PrivateRoute>
    }
  />

<Route
    path="/logout"
    element={
      <PrivateRoute>
        <Logout />
      </PrivateRoute>
    }
  />
</Routes>

{/* Show Footer only if the current path is not in `hideHeaderFooter` */}
{!hideHeaderFooter.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
