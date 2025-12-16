import React from 'react';
import './Input.css';

const Input = ({ 
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const inputClasses = [
    'input',
    error ? 'input-error' : '',
    fullWidth ? 'input-full-width' : '',
    leftIcon ? 'input-with-left-icon' : '',
    rightIcon ? 'input-with-right-icon' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`input-wrapper ${fullWidth ? 'input-wrapper-full-width' : ''}`}>
      {label && <label className="input-label">{label}</label>}
      
      <div className="input-container">
        {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
        <input className={inputClasses} {...props} />
        {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
      </div>
      
      {error && <span className="input-error-text">{error}</span>}
      {helperText && !error && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
};

export default Input;
