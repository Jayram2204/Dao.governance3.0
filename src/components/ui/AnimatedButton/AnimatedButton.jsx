import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css';

export function AnimatedButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className = '',
  onClick,
  ...props 
}) {
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    idle: { rotate: 0 },
    hover: { 
      rotate: 360,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  return (
    <motion.button
      className={`animated-button animated-button--${variant} animated-button--${size} ${className}`}
      variants={buttonVariants}
      initial="idle"
      whileHover={!disabled ? "hover" : "idle"}
      whileTap={!disabled ? "tap" : "idle"}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      <div className="animated-button__content">
        {icon && (
          <motion.span 
            className="animated-button__icon"
            variants={iconVariants}
          >
            {icon}
          </motion.span>
        )}
        <span className="animated-button__text">
          {loading ? 'Loading...' : children}
        </span>
      </div>
      
      {loading && (
        <div className="animated-button__loader">
          <div className="animated-button__spinner"></div>
        </div>
      )}
      
      <div className="animated-button__ripple"></div>
      <div className="animated-button__glow"></div>
    </motion.button>
  );
}