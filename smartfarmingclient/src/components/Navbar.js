import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom"
import logo from '../images/logo2.png'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close';

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false)

    return (
          <>
          <nav className="navbar">
            <div className="navbar-container">
              <Link to="/" className="navbar-logo" onClick={closeMenu}>
                <img src={logo} alt="logo" className="navimg-logo"/>Smart Farming
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to='/about' className="nav-links" onClick={closeMenu}>
                      About us
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/contact' className="nav-links" onClick={closeMenu}>
                      Contact us
                    </Link>
                  </li>
              </ul>

            </div>
          </nav>
          </>
    )
}

export default Navbar
