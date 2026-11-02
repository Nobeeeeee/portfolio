import React, { useEffect, useRef } from 'react';

const projects = [
  {
    id: 'omni',
    title: 'Omni Voice-Assistant',
    description: 'A voice assistant that can control your computer and talk with you',
    githubUrl: 'https://github.com/Nobeeeeee/Voice-Assistant.git',
    cardClass: 'omni-card',
    bgClass: 'omni-bg',
    delayClass: '',
  },
  {
    id: 'agri',
    title: 'Project Agri',
    description: 'a website that creates immersive agricultural experiences',
    githubUrl: 'https://github.com/Nobeeeeee/AGRONIX.git',
    cardClass: 'agri-card',
    bgClass: 'agri-bg',
    delayClass: 'delay-200',
  },
];

export default function Projects() {
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    const cards = cardRefs.current;
    if (!cards.length) return;

    // Track tilts and transforms for each card
    const cardStates = new Map();

    cards.forEach((card) => {
      cardStates.set(card, {
        tiltX: 0,
        tiltY: 0,
        scrollTiltY: 0,
        scrollZ: 0,
        scrollScale: 1,
      });

      const updateTransform = () => {
        const state = cardStates.get(card);
        if (!state) return;
        card.style.transform = `perspective(1000px) rotateX(${state.tiltX}deg) rotateY(${state.tiltY + state.scrollTiltY}deg) translateZ(${state.scrollZ}px) scale(${state.scrollScale})`;
      };

      const handleMouseMove = (e) => {
        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const state = cardStates.get(card);
        if (state) {
          state.tiltX = ((y - centerY) / centerY) * -10;
          state.tiltY = ((x - centerX) / centerX) * 10;
          updateTransform();
        }

        const glow = card.querySelector('.card-glow');
        if (glow) {
          glow.style.left = `${x - 100}px`;
          glow.style.top = `${y - 100}px`;
        }
      };

      const handleMouseLeave = () => {
        const state = cardStates.get(card);
        if (state) {
          state.tiltX = 0;
          state.tiltY = 0;
        }
        card.style.transition = 'transform 0.5s ease';
        updateTransform();

        setTimeout(() => {
          if (card) {
            card.style.transition = '';
          }
        }, 500);
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card._cleanup = () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    // 3D Scroll effect (desktop only)
    let animId;
    const updateScroll3D = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 768) {
        cards.forEach((card) => {
          card.style.transform = 'none';
        });
        animId = requestAnimationFrame(updateScroll3D);
        return;
      }

      const windowCenter = windowWidth / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distanceFromCenter = cardCenter - windowCenter;

        let normalizedDistance = distanceFromCenter / (windowWidth * 0.6);
        normalizedDistance = Math.max(-1, Math.min(1, normalizedDistance));

        const scrollRotateY = normalizedDistance * -40;
        const scrollTranslateZ = Math.abs(normalizedDistance) * -150;
        const scrollScale = 1 - Math.abs(normalizedDistance) * 0.15;

        const state = cardStates.get(card);
        if (state) {
          state.scrollTiltY = scrollRotateY;
          state.scrollZ = scrollTranslateZ;
          state.scrollScale = scrollScale;
          card.style.transform = `perspective(1000px) rotateX(${state.tiltX}deg) rotateY(${state.tiltY + state.scrollTiltY}deg) translateZ(${state.scrollZ}px) scale(${state.scrollScale})`;
        }
      });

      animId = requestAnimationFrame(updateScroll3D);
    };

    animId = requestAnimationFrame(updateScroll3D);

    // PC Horizontal Scroll wheel listener (desktop only)
    let isWheelScrolling = false;
    const handleWheel = (e) => {
      if (!grid || window.innerWidth <= 768) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScrollLeft = grid.scrollWidth - grid.clientWidth;

        if (
          (e.deltaY > 0 && Math.ceil(grid.scrollLeft) < maxScrollLeft) ||
          (e.deltaY < 0 && grid.scrollLeft > 0)
        ) {
          e.preventDefault();

          if (!isWheelScrolling) {
            isWheelScrolling = true;
            const scrollAmount =
              window.innerWidth > 600 ? 450 : window.innerWidth * 0.85;
            const direction = e.deltaY > 0 ? 1 : -1;

            grid.scrollBy({
              left: direction * scrollAmount,
              behavior: 'smooth',
            });

            setTimeout(() => {
              isWheelScrolling = false;
            }, 500);
          }
        }
      }
    };

    if (grid) {
      grid.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      cancelAnimationFrame(animId);
      cards.forEach((card) => {
        if (card._cleanup) card._cleanup();
      });
      if (grid) {
        grid.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <section id="projects" className="projects">
      <h2 className="section-title reveal text-center">Featured Projects</h2>
      <div className="project-grid" ref={gridRef}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-wrapper reveal ${project.delayClass}`.trim()}
          >
            <div
              ref={addToRefs}
              className={`glass-card project-card tilt-card ${project.cardClass}`}
            >
              <div className="card-glow"></div>
              <div className={`project-img ${project.bgClass}`}>
                <div className="overlay-text"></div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project <span>→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
