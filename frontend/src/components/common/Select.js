import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  disabled = false,
  placeholder = 'Select...',
  className = ''
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border-2 rounded-lg transition-all
          focus:outline-none focus:ring-2 focus:ring-primary/20
          disabled:cursor-not-allowed
          ${isDark 
            ? 'bg-white border-gray-600 text-gray-900 disabled:bg-gray-800' 
            : 'bg-white border-gray-300 text-gray-900 disabled:bg-gray-100'
          }
          ${error 
            ? 'border-red-500 focus:border-red-500' 
            : isDark 
              ? 'focus:border-primary' 
              : 'focus:border-primary'
          }
        `}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;