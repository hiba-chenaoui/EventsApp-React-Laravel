"use client";

import { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";



import "../styles/sidebar.css";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

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
        <Link href="/feed" className={`menu-item ${pathname === "/feed" ? "active" : ""}`}>
        <img src="/icons/home.svg" alt="Feed" className="svg-icon" />
        {isOpen && <span>Feed</span>}
        </Link>

       

        {/* Blog */}
        <Link href="/blog" className={`menu-item ${pathname === "/blog" ? "active" : ""}`}>
          <img src="/icons/blog.svg"alt="Blog" className="svg-icon" />
          {isOpen && <span>Blog</span>}
        </Link>

        {/* Profile (member only) 
        {isMember && (

        */}
          <Link
            href="/profile"
            className={`menu-item member-only show ${pathname.startsWith("/profile") ? "active" : ""}`}
          >
            <img src="/icons/profile.svg" alt="Profile" className="svg-icon" />
            {isOpen && <span>Profile</span>}
          </Link>
        {/*  })}  */}

        {/* Manager-only section */}

      </nav>
    </aside>
  );
}