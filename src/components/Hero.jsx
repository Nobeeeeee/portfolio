import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content reveal">
        <div className="greeting-wrapper">
          <p className="greeting">Hello World, I am</p>
          <div className="line"></div>
        </div>
        <h1 className="glitch" data-text="Christ Noble">
          Christ Noble
        </h1>
        <h2 className="role">
          Frontend Developer <span className="app-dev">& App Dev</span>
        </h2>
        <p className="desc">
          Crafting immersive, jaw-dropping digital experiences. I turn complex
          logic into elegant, high-performance interfaces that make people go
          "Wow".
        </p>
        <div className="cta-group">
          <a href="#projects" className="btn primary">
            <span className="btn-text">Explore Work</span>
            <span className="btn-glow"></span>
          </a>
          <a href="#contact" className="btn secondary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}

