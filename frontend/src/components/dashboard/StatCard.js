import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'blue', change }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className={`
      bg-gradient-to-br ${colors[color]} 
      text-white rounded-lg shadow-lg p-6
      transform hover:scale-105 transition-transform duration-200
    `}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium opacity-90">{title}</p>
        {Icon && (
          <div className="p-2 bg-white/20 rounded-lg">
            <Icon size={24} />
          </div>
        )}
      </div>
      
      <p className="text-3xl font-bold mb-1">{value}</p>
      
      {change && (
        <p className="text-xs opacity-80">{change}</p>
      )}
    </div>
  );
};

export default StatCard;
