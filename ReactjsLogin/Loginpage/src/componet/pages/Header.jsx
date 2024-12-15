import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
    <header className="bg-blue-600 text-white p-4 w-full fixed top-0 left-0 z-50">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-xl font-bold">My App</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
  
          {/* Show this link only if the user is authenticated */}
          <li><Link to="/logout" className="hover:underline">Logout</Link></li>
        </ul>
      </nav>
    </header>
  </div>
  
  
  )
}

export default Header
