import React from 'react';
import { FaRoad, FaGasPump, FaTachometerAlt } from 'react-icons/fa';

const StatusBar: React.FC = () => {
  return (
    <div className="h-20 bg-tesla-darkgray border-t border-tesla-lightgray px-8 flex items-center justify-around">
      {/* Speed */}
      <div className="flex items-center space-x-3">
        <FaTachometerAlt className="text-tesla-blue text-2xl" />
        <div>
          <div className="text-xs opacity-70">Speed</div>
          <div className="text-2xl font-light">0 km/h</div>
        </div>
      </div>

      {/* Range */}
      <div className="flex items-center space-x-3">
        <FaRoad className="text-green-500 text-2xl" />
        <div>
          <div className="text-xs opacity-70">Range</div>
          <div className="text-2xl font-light">234 km</div>
        </div>
      </div>

      {/* Efficiency */}
      <div className="flex items-center space-x-3">
        <FaGasPump className="text-yellow-500 text-2xl" />
        <div>
          <div className="text-xs opacity-70">Efficiency</div>
          <div className="text-2xl font-light">145 Wh/km</div>
        </div>
      </div>

      {/* Drive Mode */}
      <div>
        <div className="text-xs opacity-70">Drive Mode</div>
        <div className="text-lg font-semibold text-tesla-blue">PARK</div>
      </div>
    </div>
  );
};

export default StatusBar;
