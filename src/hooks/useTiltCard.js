import { useRef, useEffect } from 'react';

export function useTiltCard() {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let tiltX = 0;
    let tiltY = 0;

    const updateTransform = () => {
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0px) scale(1)`;
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      tiltX = ((y - centerY) / centerY) * -10;
      tiltY = ((x - centerX) / centerX) * 10;

      updateTransform();

      const glow = glowRef.current || card.querySelector('.card-glow');
      if (glow) {
        glow.style.left = `${x - 100}px`;
        glow.style.top = `${y - 100}px`;
      }
    };

    const handleMouseLeave = () => {
      tiltX = 0;
      tiltY = 0;
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

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { cardRef, glowRef };
}

