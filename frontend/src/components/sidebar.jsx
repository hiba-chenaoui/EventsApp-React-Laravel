"use client";

import { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link , useLocation } from "react-router-dom";




import "../styles/sidebar.css";


export default function Sidebar( {isOpen, setIsOpen} ) {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Toggle button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <img
          src={isOpen ? "/icons/angle-gauche-bold.svg": "/icons/angle-droit-bold.svg"}
          alt="Toggle"
          className="svg-icon"
        />
      </button>

      <nav className="menu">
        {/* Feed */}
        <Link to="/" className={`menu-item ${pathname === "/" ? "active" : ""}`}>
        <img src="/icons/home.svg" alt="Feed" className="svg-icon" />
        {isOpen && <span>Home</span>}
        </Link>

        <Link
          href="/profile"
          className={`menu-item member-only show ${pathname.startsWith("/businessProfile") ? "active" : ""}`}
        >
          <img src="/icons/profile.svg" alt="Profile" className="svg-icon" />
          {isOpen && <span>Profile</span>}
        </Link>

      </nav>
    </aside>
  );
}