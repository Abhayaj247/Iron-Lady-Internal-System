import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  icon: Icon,
  className = ''
}) => {

  const { isDark } = useTheme();
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className={`block text-sm font-semibold mb-1 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-2 border-2 rounded-lg transition-all
            focus:outline-none focus:ring-2 focus:ring-primary/20
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
