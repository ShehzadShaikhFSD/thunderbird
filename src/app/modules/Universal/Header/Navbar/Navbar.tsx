import React from 'react';
import { Link } from 'react-router-dom';
import PrescriberLogin from '../../LoginModal/Prescriber/PrescriberLogin';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* <Link className="navbar-brand" to="/">
         DDS
        </Link> */}
        <a href='/' >DDS Admin Login</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Mission
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <PrescriberLogin />
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/prescriber/Register">
               Register (Prescriber)
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Admin Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Checkout">
               Sample checkout 
              </Link>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
