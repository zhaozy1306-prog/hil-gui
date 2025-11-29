import React, { useState } from 'react';

const CarVisualization: React.FC = () => {
  const [doorStates, setDoorStates] = useState({
    frontLeft: false,
    frontRight: false,
    rearLeft: false,
    rearRight: false,
  });

  const [windowStates, setWindowStates] = useState({
    frontLeft: 100,
    frontRight: 100,
    rearLeft: 100,
    rearRight: 100,
  });

  const toggleDoor = (door: keyof typeof doorStates) => {
    setDoorStates(prev => ({ ...prev, [door]: !prev[door] }));
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Car Top View SVG */}
      <svg
        viewBox="0 0 400 600"
        className="w-full h-auto drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 0 20px rgba(62, 106, 225, 0.3))' }}
      >
        {/* Car Body */}
        <g>
          {/* Main Body */}
          <rect
            x="100"
            y="100"
            width="200"
            height="400"
            rx="40"
            fill="#222222"
            stroke="#3e6ae1"
            strokeWidth="2"
          />

          {/* Windshield */}
          <rect
            x="120"
            y="120"
            width="160"
            height="80"
            rx="10"
            fill="#1a1a2e"
            opacity="0.6"
          />

          {/* Rear Window */}
          <rect
            x="120"
            y="400"
            width="160"
            height="80"
            rx="10"
            fill="#1a1a2e"
            opacity="0.6"
          />

          {/* Left Doors */}
          <g>
            {/* Front Left Door */}
            <rect
              x={doorStates.frontLeft ? '70' : '90'}
              y="220"
              width="40"
              height="80"
              rx="5"
              fill={doorStates.frontLeft ? '#e82127' : '#393c41'}
              stroke="#3e6ae1"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300"
              onClick={() => toggleDoor('frontLeft')}
            />

            {/* Rear Left Door */}
            <rect
              x={doorStates.rearLeft ? '70' : '90'}
              y="320"
              width="40"
              height="80"
              rx="5"
              fill={doorStates.rearLeft ? '#e82127' : '#393c41'}
              stroke="#3e6ae1"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300"
              onClick={() => toggleDoor('rearLeft')}
            />
          </g>

          {/* Right Doors */}
          <g>
            {/* Front Right Door */}
            <rect
              x={doorStates.frontRight ? '290' : '270'}
              y="220"
              width="40"
              height="80"
              rx="5"
              fill={doorStates.frontRight ? '#e82127' : '#393c41'}
              stroke="#3e6ae1"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300"
              onClick={() => toggleDoor('frontRight')}
            />

            {/* Rear Right Door */}
            <rect
              x={doorStates.rearRight ? '290' : '270'}
              y="320"
              width="40"
              height="80"
              rx="5"
              fill={doorStates.rearRight ? '#e82127' : '#393c41'}
              stroke="#3e6ae1"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300"
              onClick={() => toggleDoor('rearRight')}
            />
          </g>

          {/* Wheels */}
          <circle cx="120" cy="150" r="20" fill="#1a1a1a" stroke="#3e6ae1" strokeWidth="2" />
          <circle cx="280" cy="150" r="20" fill="#1a1a1a" stroke="#3e6ae1" strokeWidth="2" />
          <circle cx="120" cy="450" r="20" fill="#1a1a1a" stroke="#3e6ae1" strokeWidth="2" />
          <circle cx="280" cy="450" r="20" fill="#1a1a1a" stroke="#3e6ae1" strokeWidth="2" />

          {/* Tesla Logo Position */}
          <circle cx="200" y="300" r="30" fill="#000" opacity="0.3" />
          <text
            x="200"
            y="310"
            textAnchor="middle"
            fill="#3e6ae1"
            fontSize="20"
            fontWeight="bold"
          >
            T
          </text>
        </g>
      </svg>

      {/* Door Status Indicators */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-center">
        <div className={`p-3 rounded-lg ${doorStates.frontLeft ? 'bg-tesla-accent' : 'bg-tesla-gray'} transition-colors`}>
          <div className="text-xs opacity-70">Front Left</div>
          <div className="text-sm font-semibold">{doorStates.frontLeft ? 'OPEN' : 'CLOSED'}</div>
        </div>
        <div className={`p-3 rounded-lg ${doorStates.frontRight ? 'bg-tesla-accent' : 'bg-tesla-gray'} transition-colors`}>
          <div className="text-xs opacity-70">Front Right</div>
          <div className="text-sm font-semibold">{doorStates.frontRight ? 'OPEN' : 'CLOSED'}</div>
        </div>
        <div className={`p-3 rounded-lg ${doorStates.rearLeft ? 'bg-tesla-accent' : 'bg-tesla-gray'} transition-colors`}>
          <div className="text-xs opacity-70">Rear Left</div>
          <div className="text-sm font-semibold">{doorStates.rearLeft ? 'OPEN' : 'CLOSED'}</div>
        </div>
        <div className={`p-3 rounded-lg ${doorStates.rearRight ? 'bg-tesla-accent' : 'bg-tesla-gray'} transition-colors`}>
          <div className="text-xs opacity-70">Rear Right</div>
          <div className="text-sm font-semibold">{doorStates.rearRight ? 'OPEN' : 'CLOSED'}</div>
        </div>
      </div>
    </div>
  );
};

export default CarVisualization;
