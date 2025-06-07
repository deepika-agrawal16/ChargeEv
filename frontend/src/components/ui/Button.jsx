import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button Component with yellow primary styling
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  // Base styles
  const baseClasses =
    'rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm';

  // Variant styles
  const variantClasses = {
    primary: 'bg-yellow-400 hover:bg-yellow-300 text-black focus:ring-yellow-400',
    secondary: 'bg-white text-yellow-700 border border-yellow-400 hover:bg-yellow-100 focus:ring-yellow-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300',
  };

  // Size styles
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'hover:scale-[1.02] active:scale-[0.98]';

  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

export default Button;
