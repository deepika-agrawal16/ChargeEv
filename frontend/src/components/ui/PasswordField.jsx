import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FiLock />
        </span>
        <input
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-10 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FiEyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <FiEye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string
};

export default PasswordField;
