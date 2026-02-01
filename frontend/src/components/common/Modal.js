import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}) => {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 backdrop-blur-sm transition-opacity ${
          isDark ? 'bg-black/70' : 'bg-black/50'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`
            relative rounded-lg shadow-2xl w-full ${sizes[size]}
            transform transition-all animate-slide-up
            ${isDark ? 'bg-gray-800' : 'bg-white'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className={`flex items-center justify-between px-6 py-4 rounded-t-lg ${
              isDark 
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white' 
                : 'bg-gradient-to-r from-primary to-primary-dark text-white'
            }`}>
              <h3 className="text-xl font-bold">{title}</h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;