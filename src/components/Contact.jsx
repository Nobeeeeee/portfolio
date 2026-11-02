import React from 'react';
import { useTiltCard } from '../hooks/useTiltCard';

export default function Contact() {
  const { cardRef, glowRef } = useTiltCard();

  return (
    <section id="contact" className="contact reveal">
      <div
        ref={cardRef}
        className="glass-card tilt-card contact-card text-center"
      >
        <div ref={glowRef} className="card-glow"></div>
        <div className="card-content">
          <h2 className="contact-heading">Contact Me</h2>
          <h2 className="contact-sub">+91 8925032560</h2>

          <a
            href="mailto:christnoble108@gmail.com"
            className="mega-email"
            target="_blank"
            rel="noopener noreferrer"
          >
            christnoble108@gmail.com
          </a>

          <div className="social-links-row">
            <a
              href="https://github.com/Nobeeeeee"
              className="minimal-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="separator">/</span>
            <a
              href="https://www.linkedin.com/in/christnoble"
              className="minimal-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span className="separator">/</span>
            <a
              href="https://www.instagram.com/one_._love_._21?igsh=MnFqNWw3NTY1cnBj"
              className="minimal-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

