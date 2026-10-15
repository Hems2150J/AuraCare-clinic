import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-medical-500 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${
            isHovered ? 1.5 : 1
          })`,
        }}
      />
      {/* Outer Follower Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-medical-400/60 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${
            isHovered ? 1.8 : 1
          })`,
          backgroundColor: isHovered ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(2, 132, 199, 0.8)' : 'rgba(2, 132, 199, 0.4)',
        }}
      />
    </>
  );
};
