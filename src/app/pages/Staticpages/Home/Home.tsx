import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">Optiorx</h1>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/About" className="navbar-link">Mission</Link>
          </li>
          <li className="navbar-item">
            <Link to="/prescriber/Register" className="navbar-link">Sign Up (Prescriber)</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Prescriber/lists" className="navbar-link">All Prescribers</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
