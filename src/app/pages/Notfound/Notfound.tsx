import React from 'react';
import './Notfound.css'; // You can create a separate CSS file for styling
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <p>Sorry, but the page you are looking for might be in another castle.</p>

        <p>     <Link to="/"> Go to Home  </Link>  </p>

      </div>
      
    </div>
  );
}

export default Notfound;
