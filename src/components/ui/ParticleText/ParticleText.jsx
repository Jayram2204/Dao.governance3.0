import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './ParticleText.css';

export function ParticleText({ 
  children, 
  className = '',
  variant = 'primary',
  animate = true,
  ...props 
}) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!animate || !textRef.current) return;

    const text = textRef.current;
    const letters = text.textContent.split('');
    text.innerHTML = '';

    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.className = 'particle-letter';
      span.style.animationDelay = `${index * 0.1}s`;
      text.appendChild(span);
    });
  }, [children, animate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={`particle-text particle-text--${variant} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      <span 
        ref={textRef}
        className="particle-text__content"
      >
        {children}
      </span>
      <div className="particle-text__glow"></div>
    </motion.div>
  );
}