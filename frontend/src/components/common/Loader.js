import React from 'react';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className={`
        ${sizes[size]}
        border-4 border-primary border-t-transparent 
        rounded-full animate-spin
      `} />
      {text && (
        <p className="text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default Loader;
