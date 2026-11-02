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
        className={`menu-toggle cat-menu-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
        id="mobile-menu"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        role="button"
        tabIndex={0}
      >
        {mobileMenuOpen ? (
          /* Clean, standalone glowing Close 'X' */
          <svg
            className="cat-icon cat-close-btn"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <line
              x1="8"
              y1="8"
              x2="24"
              y2="24"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="24"
              y1="8"
              x2="8"
              y2="24"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          /* Unmistakable Glowing Cat Face */
          <svg
            className="cat-icon"
            width="34"
            height="34"
            viewBox="0 0 32 32"
            fill="none"
          >
            {/* Cat head contour with pointy ears */}
            <path
              d="M4 13 L7 5 L12 9 C14 8.5 18 8.5 20 9 L25 5 L28 13 C29 19 25 26 16 26 C7 26 3 19 4 13 Z"
              stroke="#00f0ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner ear creases */}
            <path
              d="M8 8.5 L10 12"
              stroke="#00f0ff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M24 8.5 L22 12"
              stroke="#00f0ff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Luminous eyes */}
            <ellipse cx="11.5" cy="16" rx="1.8" ry="2.2" fill="#00f0ff" />
            <ellipse cx="20.5" cy="16" rx="1.8" ry="2.2" fill="#00f0ff" />
            {/* Nose */}
            <polygon points="16,20.5 14.5,19 17.5,19" fill="#ffffff" />
            {/* Smiling mouth */}
            <path
              d="M14 21.5 Q16 23 16 21.2 M16 21.2 Q16 23 18 21.5"
              stroke="#ffffff"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            {/* Whiskers */}
            <line
              x1="2"
              y1="16.5"
              x2="7.5"
              y2="17.5"
              stroke="#00f0ff"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <line
              x1="2.5"
              y1="20"
              x2="7.5"
              y2="19.5"
              stroke="#00f0ff"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <line
              x1="30"
              y1="16.5"
              x2="24.5"
              y2="17.5"
              stroke="#00f0ff"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <line
              x1="29.5"
              y1="20"
              x2="24.5"
              y2="19.5"
              stroke="#00f0ff"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        )}
      </div>
    </nav>
  );
}
