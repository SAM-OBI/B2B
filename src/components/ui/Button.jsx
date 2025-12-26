import PropTypes from 'prop-types';

const variants = {
  primary: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
  },
  secondary: {
    backgroundColor: 'var(--surface)',
    color: 'var(--text-main)',
    border: '1px solid var(--border)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    border: '1px solid var(--primary)',
  }
};

const Button = ({ children, variant = 'primary', onClick, style = {}, ...props }) => {
  const baseStyle = {
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'opacity 0.2s',
    ...variants[variant],
    ...style,
  };

  return (
    <button 
      style={baseStyle} 
      onClick={onClick}
      onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : 'Button')}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Button;
