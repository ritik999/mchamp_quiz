import React from 'react'
import howplay from '../../assets/images/info.png'
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
   <>
    <nav>
        <div className="nav-wrapper">
        <NavLink to="/" className="brand-logo">
        QuizMaster
</NavLink>
          <ul className="right">
            <li>
              
              <NavLink to="/How">
                <img src={howplay} alt="info" />
              </NavLink>
              
            </li>
          </ul>
        </div>
      </nav>
   </>
  )
}

export default Navbar
