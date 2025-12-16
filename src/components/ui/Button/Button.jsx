import './Button.css';

export const Button = ({
  children,
  onClick,
  className = '',
  variant = 'default', // 'default', 'primary', 'secondary', 'accent-teal', 'accent-red'
  disabled,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`ui-button ui-button--${variant} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
