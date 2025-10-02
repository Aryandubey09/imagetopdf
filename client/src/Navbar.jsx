import React, { useState, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import "./Navbar.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    if (token && email) {
      setUser(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setUser(null);
    setShowDropdown(false);
  };

  // ✅ Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Tejasvi</div>
        <div className="navbar-links">About us</div>
        <div className="navbar-action" ref={dropdownRef}>
          {user ? (
            <div
              className="user-circle"
              onClick={() => setShowDropdown(!showDropdown)}
              title={user}
            >
              {user.charAt(0).toUpperCase()}
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              Login
            </button>
          )}
        </div>
      </nav>

      {showLogin && (
        <LoginModal
          closeModal={() => {
            setShowLogin(false);
            const email = localStorage.getItem("userEmail");
            if (email) setUser(email);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
