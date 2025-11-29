import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import CarVisualization from '../components/CarVisualization';
import ControlPanel from '../components/ControlPanel';
import StatusBar from '../components/StatusBar';

const Dashboard: React.FC = () => {
  const [time, setTime] = useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-tesla-dark to-tesla-darkgray">
      {/* Top Status Bar */}
      <TopBar time={time} />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Panel - Car Visualization */}
        <div className="flex-1 flex items-center justify-center p-8">
          <CarVisualization />
        </div>

        {/* Right Panel - Controls */}
        <div className="w-96 p-6 border-l border-tesla-lightgray">
          <ControlPanel />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Dashboard;
