import { Link } from 'react-router-dom';
import React from 'react'

const Home = () => {
  return (
    <div>Home   <p>     <Link to="/About"> Go to Mission </Link>  </p> 
    <Link to="/prescriber/Register"> Sign Up ( Prescriber ) </Link>
     </div>
  )
}

export default Home