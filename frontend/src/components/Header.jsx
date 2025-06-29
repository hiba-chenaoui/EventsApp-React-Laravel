import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header1">
      <nav className="navbar">
        <div className="navdiv">
        <div className="logo1">EVENTCANVA</div>

        <ul>
          <li> <Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>

          <button> <Link to="/signin" className="auth-btn">SIGN IN</Link></button>
          <button><Link to="/signup" className="auth-btn signup">SIGN UP</Link></button>
        </ul>
        </div>

      </nav>
      
    </header>
  );
};

export default Header;
