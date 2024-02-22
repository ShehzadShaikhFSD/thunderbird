import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="back-to-home">
        <Link to="/" className="home-link">Go to Home</Link>
        <Link to="/Prescriber/lists" className="home-link">Prescriber lists</Link>
        <Link to="/prescriber/Register" className="navbar-link">Sign Up (Prescriber)</Link>
      </div>
    </div>
  );
}

export default About;
