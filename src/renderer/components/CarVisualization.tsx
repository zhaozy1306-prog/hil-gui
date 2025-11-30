import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface DoorStates {
  frontLeft: boolean;
  frontRight: boolean;
  rearLeft: boolean;
  rearRight: boolean;
  trunk: boolean;
  frunk: boolean;
}

interface TeslaCarProps {
  doorStates: DoorStates;
  onDoorClick: (door: keyof DoorStates) => void;
}

const TeslaCar: React.FC<TeslaCarProps> = ({ doorStates, onDoorClick }) => {
  const carRef = useRef<THREE.Group>(null);

  // Subtle car rotation animation
  useFrame(() => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={carRef} position={[0, 0, 0]}>
      {/* Main Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car Roof */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[3.5, 0.4, 1.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Windshield */}
      <mesh position={[1.5, 1.2, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.8]} />
        <meshStandardMaterial
          color="#4a5568"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Rear Window */}
      <mesh position={[-1.5, 1.2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.8]} />
        <meshStandardMaterial
          color="#4a5568"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Front Left Door */}
      <group
        position={[0.8, 0.5, 1.2]}
        rotation={[0, doorStates.frontLeft ? 0.5 : 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onDoorClick('frontLeft');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[1.2, 1, 0.1]} />
          <meshStandardMaterial
            color={doorStates.frontLeft ? '#e82127' : '#2a2a3e'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Door Window */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 0.4, 0.05]} />
          <meshStandardMaterial
            color="#4a5568"
            transparent
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Front Right Door */}
      <group
        position={[0.8, 0.5, -1.2]}
        rotation={[0, doorStates.frontRight ? -0.5 : 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onDoorClick('frontRight');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[1.2, 1, 0.1]} />
          <meshStandardMaterial
            color={doorStates.frontRight ? '#e82127' : '#2a2a3e'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Door Window */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 0.4, 0.05]} />
          <meshStandardMaterial
            color="#4a5568"
            transparent
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Rear Left Door */}
      <group
        position={[-0.5, 0.5, 1.2]}
        rotation={[0, doorStates.rearLeft ? 0.5 : 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onDoorClick('rearLeft');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[1.2, 1, 0.1]} />
          <meshStandardMaterial
            color={doorStates.rearLeft ? '#e82127' : '#2a2a3e'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Door Window */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 0.4, 0.05]} />
          <meshStandardMaterial
            color="#4a5568"
            transparent
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Rear Right Door */}
      <group
        position={[-0.5, 0.5, -1.2]}
        rotation={[0, doorStates.rearRight ? -0.5 : 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onDoorClick('rearRight');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[1.2, 1, 0.1]} />
          <meshStandardMaterial
            color={doorStates.rearRight ? '#e82127' : '#2a2a3e'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Door Window */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 0.4, 0.05]} />
          <meshStandardMaterial
            color="#4a5568"
            transparent
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Frunk (Front Trunk) */}
      <group
        position={[2, 0.3, 0]}
        rotation={[doorStates.frunk ? -0.5 : 0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onDoorClick('frunk');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.6, 1.8]} />
          <meshStandardMaterial
            color={doorStates.frunk ? '#e82127' : '#2a2a3e'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Trunk */}
      <group
        position={[-2, 0.8, 0]}
        rotation={[doorStates.trunk ? 0.5 : 0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onDoorClick('trunk');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.8, 1.8]} />
          <meshStandardMaterial
            color={doorStates.trunk ? '#e82127' : '#2a2a3e'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Wheels */}
      {[
        { pos: [1.5, -0.1, 1.1], name: 'fl' },
        { pos: [1.5, -0.1, -1.1], name: 'fr' },
        { pos: [-1.5, -0.1, 1.1], name: 'rl' },
        { pos: [-1.5, -0.1, -1.1], name: 'rr' },
      ].map((wheel) => (
        <group key={wheel.name} position={wheel.pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.32, 32]} />
            <meshStandardMaterial color="#3e6ae1" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.35, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      <mesh position={[2.2, 0.3, 0.6]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[2.2, 0.3, -0.6]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.2, 0.5, 0.6]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[-2.2, 0.5, -0.6]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Tesla Logo */}
      <mesh position={[2.1, 0.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#3e6ae1" emissive="#3e6ae1" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

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
    setDoorStates((prev) => ({ ...prev, [door]: !prev[door] }));
  };

  return (
    <div className="relative w-full max-w-4xl">
      {/* 3D Canvas */}
      <div className="w-full h-96 bg-gradient-to-b from-tesla-darkgray to-tesla-dark rounded-xl overflow-hidden">
        <Canvas shadows>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={50} />

          {/* Lights */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 5, -5]} intensity={0.5} color="#3e6ae1" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
            color="#ffffff"
          />

          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.8} />
          </mesh>

          {/* Tesla Car */}
          <TeslaCar doorStates={doorStates} onDoorClick={toggleDoor} />

          {/* Grid Helper */}
          <gridHelper args={[20, 20, '#3e6ae1', '#1a1a1a']} position={[0, -0.49, 0]} />

          {/* Orbit Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
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
            <span
              className={`w-2 h-2 rounded-full ${
                doorStates.frontLeft ? 'bg-red-500 animate-pulse' : 'bg-green-500'
              }`}
            />
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
            <span
              className={`w-2 h-2 rounded-full ${
                doorStates.frunk ? 'bg-red-500 animate-pulse' : 'bg-green-500'
              }`}
            />
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
            <span
              className={`w-2 h-2 rounded-full ${
                doorStates.frontRight ? 'bg-red-500 animate-pulse' : 'bg-green-500'
              }`}
            />
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
            <span
              className={`w-2 h-2 rounded-full ${
                doorStates.rearLeft ? 'bg-red-500 animate-pulse' : 'bg-green-500'
              }`}
            />
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
            <span
              className={`w-2 h-2 rounded-full ${
                doorStates.trunk ? 'bg-red-500 animate-pulse' : 'bg-green-500'
              }`}
            />
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
            <span
              className={`w-2 h-2 rounded-full ${
                doorStates.rearRight ? 'bg-red-500 animate-pulse' : 'bg-green-500'
              }`}
            />
            {doorStates.rearRight ? 'OPEN' : 'CLOSED'}
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={() =>
            setDoorStates({
              frontLeft: false,
              frontRight: false,
              rearLeft: false,
              rearRight: false,
              trunk: false,
              frunk: false,
            })
          }
          className="px-6 py-2 bg-tesla-blue hover:bg-blue-600 rounded-lg text-sm font-semibold transition-colors"
        >
          Close All
        </button>
        <button
          onClick={() =>
            setDoorStates({
              frontLeft: true,
              frontRight: true,
              rearLeft: true,
              rearRight: true,
              trunk: true,
              frunk: true,
            })
          }
          className="px-6 py-2 bg-tesla-accent hover:bg-red-600 rounded-lg text-sm font-semibold transition-colors"
        >
          Open All
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm opacity-70">
        <p>🖱️ Click and drag to rotate • Scroll to zoom • Click car parts to toggle</p>
      </div>
    </div>
  );
};

export default CarVisualization;
