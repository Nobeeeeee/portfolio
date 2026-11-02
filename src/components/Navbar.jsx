import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav>
      <a href="#home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo">
          CN<span className="dot">.</span>
        </div>
      </a>
      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <li>
          <a href="#home" onClick={handleLinkClick}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={handleLinkClick}>
            About
          </a>
        </li>
        <li>
          <a href="#projects" onClick={handleLinkClick}>
            Work
          </a>
        </li>
        <li>
          <a href="#contact" onClick={handleLinkClick}>
            Contact
          </a>
        </li>
      </ul>
      <div
        className={`menu-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
        id="mobile-menu"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        role="button"
        tabIndex={0}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

