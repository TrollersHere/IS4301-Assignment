import React, { useState } from 'react';
import nusLogo from '../nus_logo.svg';

function Navbar({ activePage, setActivePage }) {
  const [navExpanded, setNavExpanded] = useState(false);

  const navItems = ['Home', 'Academics', 'Admission'];

  const handleNavClick = (page) => {
    setActivePage(page);
    setNavExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm mb-4">
      <div className="container">
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
        <div
          className={`collapse navbar-collapse ${navExpanded ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {navItems.map((page) => (
              <li className="nav-item" key={page}>
                <a
                  className={`nav-link px-3 ${
                    activePage === page
                      ? 'active fw-bold text-primary'
                      : 'text-dark'
                  }`}
                  href={`#${page.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(page);
                  }}
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
