import React from 'react';
import { useTiltCard } from '../hooks/useTiltCard';

export default function About() {
  const mainCard = useTiltCard();
  const imgCard = useTiltCard();

  return (
    <section id="about" className="about">
      <div ref={mainCard.cardRef} className="glass-card tilt-card reveal">
        <div ref={mainCard.glowRef} className="card-glow"></div>
        <div className="card-content about-grid">
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="dummy-text">
              I am a creative Frontend Developer who loves bridging the gap between
              design and engineering. While my core strength lies in building
              stunning web interfaces, I also have a strong hand in mobile app
              development. I obsess over micro-interactions, 3D animations, and
              pixel-perfect designs.
            </p>
            <div className="skills">
              <span className="skill-tag">HTML5 / CSS3</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">Flutter</span>
              <span className="skill-tag">Firebase</span>
            </div>
          </div>
          <div className="about-image-wrapper">
            <div ref={imgCard.cardRef} className="profile-img-container tilt-card">
              <img
                src="/portfolio.jpeg"
                alt="Christ Noble"
                className="profile-img"
              />
              <div ref={imgCard.glowRef} className="card-glow img-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

