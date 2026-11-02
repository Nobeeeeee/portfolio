import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const revealOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach((el) => {
      observer.observe(el);
    });

    // Check once immediately for elements in viewport
    const timer = setTimeout(() => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('active');
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      revealElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
}

