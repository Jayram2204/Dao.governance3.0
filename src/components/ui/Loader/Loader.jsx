import './Loader.css';

export const Loader = ({ size = 'md', color = 'primary' }) => {
  // size: 'sm', 'md', 'lg'
  // color: 'primary', 'secondary', 'accent-teal', 'text-primary'
  return (
    <div className={`ui-loader ui-loader--${size} ui-loader--${color}`}></div>
  );
};
