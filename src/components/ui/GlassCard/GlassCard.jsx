import React from 'react';
import { motion } from 'framer-motion';
import './GlassCard.css';

export function GlassCard({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: hover ? {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    } : {}
  };

  return (
    <motion.div
      className={`glass-card glass-card--${variant} ${glow ? 'glass-card--glow' : ''} ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      {...props}
    >
      <div className="glass-card__content">
        {children}
      </div>
      <div className="glass-card__shine"></div>
    </motion.div>
  );
}