import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const Alert = ({ 
  type = 'info', 
  message, 
  onClose,
  className = '' 
}) => {
  const types = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: XCircle,
      iconColor: 'text-red-600'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-600'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-600'
    }
  };

  const { bg, text, icon: Icon, iconColor } = types[type];

  return (
    <div className={`
      flex items-center gap-3 px-4 py-3 border rounded-lg
      ${bg} ${text} ${className}
    `}>
      <Icon className={iconColor} size={20} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="hover:bg-black/5 p-1 rounded transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
