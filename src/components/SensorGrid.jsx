    // src/components/SensorGrid.jsx
import React from 'react';
import { Droplets, Thermometer, Wind } from 'lucide-react';
import SensorCard from './SensorCard.jsx';

// You can pass the actual readings as props to this grid later when connected to the database
const SensorGrid = ({ ph = "6.8", temp = "26.5", methane = "32" }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
      <div className="flex-1 w-full">
        <SensorCard 
          label="Acidity" 
          value={ph} 
          unit="pH" 
          icon={Droplets} 
          color="#059669" 
        />
      </div>
      <div className="flex-1 w-full">
        <SensorCard 
          label="Temperature" 
          value={temp} 
          unit="°C" 
          icon={Thermometer} 
          color="#ef4444" 
        />
      </div>
      <div className="flex-1 w-full">
        <SensorCard 
          label="Methane" 
          value={methane} 
          unit="%" 
          icon={Wind} 
          color="#f59e0b" 
        />
      </div>
    </div>
  );
};

export default SensorGrid;