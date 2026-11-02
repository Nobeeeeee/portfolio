import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const moveCursor = (posX, posY) => {
      dot.style.left = `${posX}px`;
      dot.style.top = `${posY}px`;

      outline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: 'forwards' }
      );
    };

    const handleMouseMove = (e) => {
      moveCursor(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        moveCursor(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        moveCursor(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Handle mouse enter / leave for interactables
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.btn') ||
        target.closest('.skill-tag') ||
        target.closest('.menu-toggle')
      ) {
        outline.style.width = '60px';
        outline.style.height = '60px';
        outline.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.btn') ||
        target.closest('.skill-tag') ||
        target.closest('.menu-toggle')
      ) {
        outline.style.width = '40px';
        outline.style.height = '40px';
        outline.style.backgroundColor = 'transparent';
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
}

