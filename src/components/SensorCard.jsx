import React from 'react';

const SensorCard = ({ label, value, unit, icon: Icon, color }) => {
  return (
    <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between h-full w-full hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4 md:mb-6 w-full">
        <div 
          className="p-3 md:p-4 rounded-2xl shadow-sm" 
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon size={24} />
        </div>
        <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest text-right">
          {label}
        </span>
      </div>
      
      <div className="flex items-baseline gap-1 md:gap-2 mt-auto w-full">
        <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
          {value}
        </span>
        <span className="text-base md:text-lg font-bold text-gray-500">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default SensorCard;