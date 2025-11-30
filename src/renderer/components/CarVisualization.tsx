import React, { useState } from 'react';

interface DoorStates {
  frontLeft: boolean;
  frontRight: boolean;
  rearLeft: boolean;
  rearRight: boolean;
  trunk: boolean;
  frunk: boolean;
}

const CarVisualization: React.FC = () => {
  const [doorStates, setDoorStates] = useState<DoorStates>({
    frontLeft: false,
    frontRight: false,
    rearLeft: false,
    rearRight: false,
    trunk: false,
    frunk: false,
  });

  const toggleDoor = (door: keyof DoorStates) => {
    setDoorStates(prev => ({ ...prev, [door]: !prev[door] }));
  };

  return (
    <div className="relative w-full max-w-4xl">
      {/* 3D Car Container */}
      <div className="relative" style={{ perspective: '1200px' }}>
        {/* Car Body with 3D Transform */}
        <div
          className="relative transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(25deg) rotateZ(-5deg)',
          }}
        >
          {/* Main Car SVG */}
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(62, 106, 225, 0.4))' }}
          >
            <defs>
              {/* Gradients for realistic look */}
              <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a2a3e" />
                <stop offset="50%" stopColor="#1a1a2e" />
                <stop offset="100%" stopColor="#0f0f1e" />
              </linearGradient>

              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a5568" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1a202c" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="doorOpenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e82127" />
                <stop offset="100%" stopColor="#ff4d4d" />
              </linearGradient>

              {/* Shadow filter */}
              <filter id="carShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
                <feOffset dx="0" dy="20" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Ground Shadow */}
            <ellipse
              cx="400"
              cy="360"
              rx="280"
              ry="40"
              fill="rgba(0,0,0,0.3)"
              filter="url(#carShadow)"
            />

            {/* Car Body Main Shape - Tesla Model 3 Profile */}
            <g filter="url(#carShadow)">
              {/* Main body */}
              <path
                d="M 200 200 Q 200 160, 240 150 L 560 150 Q 600 160, 600 200 L 600 280 Q 600 300, 580 300 L 220 300 Q 200 300, 200 280 Z"
                fill="url(#carBodyGradient)"
                stroke="#3e6ae1"
                strokeWidth="2"
              />

              {/* Roof line */}
              <path
                d="M 240 150 L 260 130 L 340 120 L 460 120 L 540 130 L 560 150"
                fill="url(#carBodyGradient)"
                stroke="#3e6ae1"
                strokeWidth="2"
              />

              {/* Windshield */}
              <path
                d="M 260 130 L 280 145 L 340 140 L 340 120 Z"
                fill="url(#glassGradient)"
                opacity="0.7"
              />

              {/* Rear Window */}
              <path
                d="M 460 120 L 460 140 L 520 145 L 540 130 Z"
                fill="url(#glassGradient)"
                opacity="0.7"
              />

              {/* Side Windows - Front Left */}
              <path
                d="M 280 160 L 320 155 L 360 155 L 360 200 L 280 200 Z"
                fill="url(#glassGradient)"
                opacity="0.6"
                stroke="#3e6ae1"
                strokeWidth="1"
              />

              {/* Side Windows - Rear Left */}
              <path
                d="M 370 155 L 430 155 L 430 200 L 370 200 Z"
                fill="url(#glassGradient)"
                opacity="0.6"
                stroke="#3e6ae1"
                strokeWidth="1"
              />

              {/* Side Windows - Front Right */}
              <path
                d="M 440 155 L 480 155 L 520 160 L 520 200 L 440 200 Z"
                fill="url(#glassGradient)"
                opacity="0.6"
                stroke="#3e6ae1"
                strokeWidth="1"
              />

              {/* Door Lines */}
              <line x1="360" y1="200" x2="360" y2="300" stroke="#1a1a2e" strokeWidth="3" />
              <line x1="430" y1="200" x2="430" y2="300" stroke="#1a1a2e" strokeWidth="3" />
              <line x1="440" y1="200" x2="440" y2="300" stroke="#1a1a2e" strokeWidth="3" />

              {/* Tesla Logo Area */}
              <circle cx="400" cy="240" r="25" fill="rgba(0,0,0,0.3)" />
              <text
                x="400"
                y="250"
                textAnchor="middle"
                fill="#3e6ae1"
                fontSize="28"
                fontWeight="bold"
                fontFamily="Arial"
              >
                T
              </text>
            </g>

            {/* Wheels with 3D effect */}
            <g>
              {/* Front Left Wheel */}
              <circle cx="280" cy="310" r="35" fill="#1a1a1a" stroke="#3e6ae1" strokeWidth="3" />
              <circle cx="280" cy="310" r="25" fill="#0a0a0a" />
              <circle cx="280" cy="310" r="8" fill="#3e6ae1" />

              {/* Rear Left Wheel */}
              <circle cx="520" cy="310" r="35" fill="#1a1a1a" stroke="#3e6ae1" strokeWidth="3" />
              <circle cx="520" cy="310" r="25" fill="#0a0a0a" />
              <circle cx="520" cy="310" r="8" fill="#3e6ae1" />

              {/* Wheel details - spokes */}
              {[0, 60, 120, 180, 240, 300].map(angle => (
                <g key={`fl-${angle}`}>
                  <line
                    x1="280"
                    y1="310"
                    x2={280 + 20 * Math.cos((angle * Math.PI) / 180)}
                    y2={310 + 20 * Math.sin((angle * Math.PI) / 180)}
                    stroke="#3e6ae1"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                </g>
              ))}
              {[0, 60, 120, 180, 240, 300].map(angle => (
                <g key={`rl-${angle}`}>
                  <line
                    x1="520"
                    y1="310"
                    x2={520 + 20 * Math.cos((angle * Math.PI) / 180)}
                    y2={310 + 20 * Math.sin((angle * Math.PI) / 180)}
                    stroke="#3e6ae1"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                </g>
              ))}
            </g>

            {/* Interactive Door Overlays */}
            {/* Front Left Door */}
            <g
              onClick={() => toggleDoor('frontLeft')}
              className="cursor-pointer transition-all duration-300"
              style={{ transformOrigin: '220px 250px' }}
            >
              <path
                d="M 220 200 L 360 200 L 360 300 L 220 300 Z"
                fill={doorStates.frontLeft ? 'url(#doorOpenGradient)' : 'transparent'}
                stroke={doorStates.frontLeft ? '#e82127' : '#3e6ae1'}
                strokeWidth="2"
                opacity={doorStates.frontLeft ? 0.7 : 0.1}
                className="hover:opacity-30 transition-opacity"
              />
              {doorStates.frontLeft && (
                <path
                  d="M 220 200 L 180 220 L 180 320 L 220 300 Z"
                  fill="url(#doorOpenGradient)"
                  opacity="0.5"
                />
              )}
            </g>

            {/* Rear Left Door */}
            <g
              onClick={() => toggleDoor('rearLeft')}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 370 200 L 430 200 L 430 300 L 370 300 Z"
                fill={doorStates.rearLeft ? 'url(#doorOpenGradient)' : 'transparent'}
                stroke={doorStates.rearLeft ? '#e82127' : '#3e6ae1'}
                strokeWidth="2"
                opacity={doorStates.rearLeft ? 0.7 : 0.1}
                className="hover:opacity-30 transition-opacity"
              />
              {doorStates.rearLeft && (
                <path
                  d="M 370 200 L 330 220 L 330 320 L 370 300 Z"
                  fill="url(#doorOpenGradient)"
                  opacity="0.5"
                />
              )}
            </g>

            {/* Front Right Door */}
            <g
              onClick={() => toggleDoor('frontRight')}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 440 200 L 520 200 L 520 300 L 440 300 Z"
                fill={doorStates.frontRight ? 'url(#doorOpenGradient)' : 'transparent'}
                stroke={doorStates.frontRight ? '#e82127' : '#3e6ae1'}
                strokeWidth="2"
                opacity={doorStates.frontRight ? 0.7 : 0.1}
                className="hover:opacity-30 transition-opacity"
              />
              {doorStates.frontRight && (
                <path
                  d="M 520 200 L 560 220 L 560 320 L 520 300 Z"
                  fill="url(#doorOpenGradient)"
                  opacity="0.5"
                />
              )}
            </g>

            {/* Rear Right Door */}
            <g
              onClick={() => toggleDoor('rearRight')}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 530 200 L 580 200 L 580 300 L 530 300 Z"
                fill={doorStates.rearRight ? 'url(#doorOpenGradient)' : 'transparent'}
                stroke={doorStates.rearRight ? '#e82127' : '#3e6ae1'}
                strokeWidth="2"
                opacity={doorStates.rearRight ? 0.7 : 0.1}
                className="hover:opacity-30 transition-opacity"
              />
              {doorStates.rearRight && (
                <path
                  d="M 580 200 L 620 220 L 620 320 L 580 300 Z"
                  fill="url(#doorOpenGradient)"
                  opacity="0.5"
                />
              )}
            </g>

            {/* Frunk (Front Trunk) */}
            <g
              onClick={() => toggleDoor('frunk')}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 200 260 L 200 300 L 220 300 L 220 260 Z"
                fill={doorStates.frunk ? 'url(#doorOpenGradient)' : 'transparent'}
                stroke={doorStates.frunk ? '#e82127' : '#3e6ae1'}
                strokeWidth="2"
                opacity={doorStates.frunk ? 0.7 : 0.1}
                className="hover:opacity-30 transition-opacity"
              />
            </g>

            {/* Trunk */}
            <g
              onClick={() => toggleDoor('trunk')}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 580 200 L 600 200 L 600 280 L 580 280 Z"
                fill={doorStates.trunk ? 'url(#doorOpenGradient)' : 'transparent'}
                stroke={doorStates.trunk ? '#e82127' : '#3e6ae1'}
                strokeWidth="2"
                opacity={doorStates.trunk ? 0.7 : 0.1}
                className="hover:opacity-30 transition-opacity"
              />
              {doorStates.trunk && (
                <path
                  d="M 580 150 L 600 150 L 620 170 L 620 280 L 600 280 L 600 200 Z"
                  fill="url(#doorOpenGradient)"
                  opacity="0.5"
                />
              )}
            </g>

            {/* Headlights */}
            <ellipse cx="210" cy="270" rx="8" ry="12" fill="#fff" opacity="0.8" />
            <ellipse cx="210" cy="290" rx="8" ry="12" fill="#fff" opacity="0.8" />

            {/* Taillights */}
            <ellipse cx="590" cy="270" rx="6" ry="10" fill="#ff0000" opacity="0.6" />
            <ellipse cx="590" cy="285" rx="6" ry="10" fill="#ff0000" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Status Grid */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {/* Front Left Door */}
        <button
          onClick={() => toggleDoor('frontLeft')}
          className={`p-4 rounded-lg transition-all duration-300 ${
            doorStates.frontLeft
              ? 'bg-tesla-accent shadow-lg shadow-red-500/50'
              : 'bg-tesla-gray hover:bg-tesla-lightgray'
          }`}
        >
          <div className="text-xs opacity-70 mb-1">Front Left</div>
          <div className="text-sm font-semibold flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${doorStates.frontLeft ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            {doorStates.frontLeft ? 'OPEN' : 'CLOSED'}
          </div>
        </button>

        {/* Frunk */}
        <button
          onClick={() => toggleDoor('frunk')}
          className={`p-4 rounded-lg transition-all duration-300 ${
            doorStates.frunk
              ? 'bg-tesla-accent shadow-lg shadow-red-500/50'
              : 'bg-tesla-gray hover:bg-tesla-lightgray'
          }`}
        >
          <div className="text-xs opacity-70 mb-1">Front Trunk</div>
          <div className="text-sm font-semibold flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${doorStates.frunk ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            {doorStates.frunk ? 'OPEN' : 'CLOSED'}
          </div>
        </button>

        {/* Front Right Door */}
        <button
          onClick={() => toggleDoor('frontRight')}
          className={`p-4 rounded-lg transition-all duration-300 ${
            doorStates.frontRight
              ? 'bg-tesla-accent shadow-lg shadow-red-500/50'
              : 'bg-tesla-gray hover:bg-tesla-lightgray'
          }`}
        >
          <div className="text-xs opacity-70 mb-1">Front Right</div>
          <div className="text-sm font-semibold flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${doorStates.frontRight ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            {doorStates.frontRight ? 'OPEN' : 'CLOSED'}
          </div>
        </button>

        {/* Rear Left Door */}
        <button
          onClick={() => toggleDoor('rearLeft')}
          className={`p-4 rounded-lg transition-all duration-300 ${
            doorStates.rearLeft
              ? 'bg-tesla-accent shadow-lg shadow-red-500/50'
              : 'bg-tesla-gray hover:bg-tesla-lightgray'
          }`}
        >
          <div className="text-xs opacity-70 mb-1">Rear Left</div>
          <div className="text-sm font-semibold flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${doorStates.rearLeft ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            {doorStates.rearLeft ? 'OPEN' : 'CLOSED'}
          </div>
        </button>

        {/* Trunk */}
        <button
          onClick={() => toggleDoor('trunk')}
          className={`p-4 rounded-lg transition-all duration-300 ${
            doorStates.trunk
              ? 'bg-tesla-accent shadow-lg shadow-red-500/50'
              : 'bg-tesla-gray hover:bg-tesla-lightgray'
          }`}
        >
          <div className="text-xs opacity-70 mb-1">Rear Trunk</div>
          <div className="text-sm font-semibold flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${doorStates.trunk ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            {doorStates.trunk ? 'OPEN' : 'CLOSED'}
          </div>
        </button>

        {/* Rear Right Door */}
        <button
          onClick={() => toggleDoor('rearRight')}
          className={`p-4 rounded-lg transition-all duration-300 ${
            doorStates.rearRight
              ? 'bg-tesla-accent shadow-lg shadow-red-500/50'
              : 'bg-tesla-gray hover:bg-tesla-lightgray'
          }`}
        >
          <div className="text-xs opacity-70 mb-1">Rear Right</div>
          <div className="text-sm font-semibold flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${doorStates.rearRight ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            {doorStates.rearRight ? 'OPEN' : 'CLOSED'}
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={() => setDoorStates({
            frontLeft: false,
            frontRight: false,
            rearLeft: false,
            rearRight: false,
            trunk: false,
            frunk: false,
          })}
          className="px-6 py-2 bg-tesla-blue hover:bg-blue-600 rounded-lg text-sm font-semibold transition-colors"
        >
          Close All
        </button>
        <button
          onClick={() => setDoorStates({
            frontLeft: true,
            frontRight: true,
            rearLeft: true,
            rearRight: true,
            trunk: true,
            frunk: true,
          })}
          className="px-6 py-2 bg-tesla-accent hover:bg-red-600 rounded-lg text-sm font-semibold transition-colors"
        >
          Open All
        </button>
      </div>
    </div>
  );
};

export default CarVisualization;
