import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <div>
        <Link to="/" className="home-link">Go to Home</Link>
        <Link to="/Prescriber/lists" className="home-link">Prescriber lists</Link>
        <Link to="/About" className="navbar-link">Mission</Link>
        <h1 className='heading-banner' >OptioRX</h1>
    </div>
  )
}

export default Header