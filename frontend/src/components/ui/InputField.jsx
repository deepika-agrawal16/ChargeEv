import React from 'react';
import PropTypes from 'prop-types';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

const iconMap = {
  username: <FiUser />,
  email: <FiMail />,
  phoneNumber: <FiPhone />  // Correct field name!
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
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
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
          className="w-full py-1 pl-10 pr-4 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
