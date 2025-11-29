import React from 'react';
import { FaBluetooth, FaWifi, FaBatteryFull } from 'react-icons/fa';

interface TopBarProps {
  time: Date;
}

const TopBar: React.FC<TopBarProps> = ({ time }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="h-16 bg-tesla-darkgray border-b border-tesla-lightgray px-6 flex items-center justify-between">
      {/* Left Section - Tesla Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold tracking-wider">TESLA</div>
      </div>

      {/* Center Section - Time */}
      <div className="text-3xl font-light tracking-wide">
        {formatTime(time)}
      </div>

      {/* Right Section - Status Icons */}
      <div className="flex items-center space-x-4">
        <FaWifi className="text-xl text-tesla-white" />
        <FaBluetooth className="text-xl text-tesla-blue" />
        <div className="flex items-center space-x-2">
          <FaBatteryFull className="text-xl text-green-500" />
          <span className="text-sm">85%</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
