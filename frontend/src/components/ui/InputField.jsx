import React from 'react';
import PropTypes from 'prop-types';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi'; // import icons here based on type

const iconMap = {
  username: <FiUser />,
  email: <FiMail />,
  phone: <FiPhone />
};

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  className = ''
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {iconMap[name]}
        </span>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  className: PropTypes.string
};

export default InputField;
