import React, { useState } from 'react';
import { FaLock, FaUnlock, FaFan, FaTemperatureHigh, FaChargingStation } from 'react-icons/fa';

const ControlPanel: React.FC = () => {
  const [temperature, setTemperature] = useState(22);
  const [isLocked, setIsLocked] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(2);
  const [isCharging, setIsCharging] = useState(false);

  const adjustTemperature = (delta: number) => {
    setTemperature(prev => Math.max(16, Math.min(30, prev + delta)));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-6">Vehicle Controls</h2>

      {/* Climate Control */}
      <div className="bg-tesla-gray rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FaTemperatureHigh className="text-tesla-blue text-xl" />
            <span className="text-sm font-medium">Climate</span>
          </div>
          <FaFan className={`text-xl ${fanSpeed > 0 ? 'text-tesla-blue animate-spin' : 'text-gray-500'}`}
                 style={{ animationDuration: `${3 / fanSpeed}s` }} />
        </div>

        {/* Temperature Display */}
        <div className="text-center">
          <div className="text-5xl font-light mb-4">{temperature}°C</div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => adjustTemperature(-1)}
              className="w-12 h-12 rounded-full bg-tesla-lightgray hover:bg-tesla-blue transition-colors flex items-center justify-center text-2xl"
            >
              −
            </button>
            <button
              onClick={() => adjustTemperature(1)}
              className="w-12 h-12 rounded-full bg-tesla-lightgray hover:bg-tesla-blue transition-colors flex items-center justify-center text-2xl"
            >
              +
            </button>
          </div>
        </div>

        {/* Fan Speed Control */}
        <div className="pt-4">
          <div className="flex justify-between text-xs mb-2">
            <span>Fan Speed</span>
            <span>{fanSpeed}/3</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            value={fanSpeed}
            onChange={(e) => setFanSpeed(Number(e.target.value))}
            className="w-full h-2 bg-tesla-lightgray rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3e6ae1 0%, #3e6ae1 ${(fanSpeed / 3) * 100}%, #393c41 ${(fanSpeed / 3) * 100}%, #393c41 100%)`
            }}
          />
        </div>
      </div>

      {/* Lock Control */}
      <div className="bg-tesla-gray rounded-xl p-6">
        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`w-full py-4 rounded-lg flex items-center justify-center space-x-3 transition-all ${
            isLocked
              ? 'bg-tesla-accent hover:bg-red-600'
              : 'bg-tesla-blue hover:bg-blue-600'
          }`}
        >
          {isLocked ? <FaLock className="text-2xl" /> : <FaUnlock className="text-2xl" />}
          <span className="text-lg font-semibold">
            {isLocked ? 'LOCKED' : 'UNLOCKED'}
          </span>
        </button>
      </div>

      {/* Charging Status */}
      <div className="bg-tesla-gray rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FaChargingStation className={`text-xl ${isCharging ? 'text-green-500' : 'text-gray-500'}`} />
            <span className="text-sm font-medium">Charging</span>
          </div>
          <button
            onClick={() => setIsCharging(!isCharging)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isCharging
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-tesla-lightgray hover:bg-tesla-blue'
            }`}
          >
            {isCharging ? 'Stop' : 'Start'}
          </button>
        </div>

        {isCharging && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Battery</span>
              <span className="text-green-500">85%</span>
            </div>
            <div className="w-full h-3 bg-tesla-lightgray rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                style={{ width: '85%' }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-70">
              <span>234 km range</span>
              <span>~45 min to full</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-tesla-gray hover:bg-tesla-lightgray py-3 rounded-lg text-sm font-medium transition-colors">
          Lights
        </button>
        <button className="bg-tesla-gray hover:bg-tesla-lightgray py-3 rounded-lg text-sm font-medium transition-colors">
          Horn
        </button>
        <button className="bg-tesla-gray hover:bg-tesla-lightgray py-3 rounded-lg text-sm font-medium transition-colors">
          Trunk
        </button>
        <button className="bg-tesla-gray hover:bg-tesla-lightgray py-3 rounded-lg text-sm font-medium transition-colors">
          Frunk
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
