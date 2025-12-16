import React from 'react';
import './Badge.css';

const Badge = ({ children, variant = 'default', size = 'medium', ...props }) => {
  return (
    <span className={`badge badge--${variant} badge--${size}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
