export interface ElectronAPI {
  platform: NodeJS.Platform;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export interface VehicleStatus {
  speed: number;
  range: number;
  efficiency: number;
  driveMode: 'PARK' | 'REVERSE' | 'NEUTRAL' | 'DRIVE';
  battery: number;
  isCharging: boolean;
}

export interface DoorStates {
  frontLeft: boolean;
  frontRight: boolean;
  rearLeft: boolean;
  rearRight: boolean;
}

export interface WindowStates {
  frontLeft: number; // 0-100
  frontRight: number;
  rearLeft: number;
  rearRight: number;
}

export interface ClimateSettings {
  temperature: number;
  fanSpeed: number;
  isOn: boolean;
}
