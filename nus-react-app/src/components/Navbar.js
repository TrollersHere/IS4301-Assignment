import React, { useState } from 'react';
import nusLogo from '../nus_logo.svg';

function Navbar({ activePage, setActivePage, currentUser, onLogout }) {
  const [navExpanded, setNavExpanded] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setNavExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm mb-4">
      <div className="container">
        {/* NUS Logo only (no NUS word) */}
        <a
          className="navbar-brand py-1"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('Home');
          }}
        >
          <img
            src={nusLogo}
            alt="NUS Logo"
            height="44"
            className="d-inline-block align-middle"
          />
        </a>

        {/* Mobile menu toggler */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={navExpanded}
          aria-label="Toggle navigation"
          onClick={() => setNavExpanded(!navExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links & Auth actions */}
        <div
          className={`collapse navbar-collapse ${navExpanded ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            {/* Home Link */}
            <li className="nav-item">
              <a
                className={`nav-link px-3 ${
                  activePage === 'Home'
                    ? 'active fw-bold text-primary'
                    : 'text-dark'
                }`}
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Home');
                }}
              >
                Home
              </a>
            </li>

            {/* Academics Link (Protected) */}
            <li className="nav-item">
              <a
                className={`nav-link px-3 d-flex align-items-center ${
                  activePage === 'Academics'
                    ? 'active fw-bold text-primary'
                    : 'text-dark'
                }`}
                href="#academics"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Academics');
                }}
              >
                <span>Academics</span>
              </a>
            </li>

            {/* Admission Link (Protected) */}
            <li className="nav-item">
              <a
                className={`nav-link px-3 d-flex align-items-center ${
                  activePage === 'Admission'
                    ? 'active fw-bold text-primary'
                    : 'text-dark'
                }`}
                href="#admission"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Admission');
                }}
              >
                <span>Admission</span>
              </a>
            </li>

            {/* Login / User Status & Logout */}
            {currentUser ? (
              <li className="nav-item dropdown ms-lg-2 mt-2 mt-lg-0">
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="badge bg-light text-dark border px-3 py-2 text-truncate"
                    style={{ maxWidth: '200px' }}
                    title={currentUser.email}
                  >
                    👤 {currentUser.displayName || currentUser.email}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => {
                      onLogout();
                      setNavExpanded(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <a
                  className={`btn btn-sm px-3 ${
                    activePage === 'Login'
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('Login');
                  }}
                >
                  Login / Sign Up
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
