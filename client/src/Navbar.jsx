import React, { useState, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // for dropdown toggle
import "./Navbar.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    if (token && email) setUser(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setUser(null);
    setShowDropdown(false);
  };

  // Close dropdown if clicked outside
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
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MargDarshak
          </a>
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Right-aligned links and login/user */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item me-2  ">
                <a className="nav-link active " aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item  me-2 ">
                <a className="nav-link me-2" href="#">
                  About
                </a>
              </li>
              <li className="nav-item" ref={dropdownRef}>
                {user ? (
                  <div
                    className="nav-link dropdown-toggle user-circle"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    title={user}
                  >
                    {user.charAt(0).toUpperCase()}
                    {showDropdown && (
                      <ul className="dropdown-menu show">
                        <li>
                          <button className="dropdown-item" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-primary ms-3"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
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
