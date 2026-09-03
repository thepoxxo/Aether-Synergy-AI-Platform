import React, { createContext, useContext, useState, useEffect } from 'react';

export type DeviceMode = 'auto' | 'mobile_phone' | 'tablet' | 'desktop_standard' | 'desktop_ultrawide' | 'android_emulator';

export type PerformanceProfile = 'eco_mobile' | 'balanced' | 'ultra_60fps';

interface DeviceModeContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isEmulator: boolean;
  performanceProfile: PerformanceProfile;
  setPerformanceProfile: (prof: PerformanceProfile) => void;
  isNativeAppFrameVisible: boolean;
  setIsNativeAppFrameVisible: (visible: boolean) => void;
  hapticFeedback: () => void;
}

const DeviceModeContext = createContext<DeviceModeContextType | undefined>(undefined);

export const DeviceModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceMode, setDeviceModeState] = useState<DeviceMode>(() => {
    return (localStorage.getItem('aether_device_mode') as DeviceMode) || 'auto';
  });
  const [performanceProfile, setPerformanceProfile] = useState<PerformanceProfile>('ultra_60fps');
  const [isNativeAppFrameVisible, setIsNativeAppFrameVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setDeviceMode = (mode: DeviceMode) => {
    setDeviceModeState(mode);
    localStorage.setItem('aether_device_mode', mode);
  };

  const isMobile =
    deviceMode === 'mobile_phone' ||
    deviceMode === 'android_emulator' ||
    (deviceMode === 'auto' && windowWidth < 768);

  const isTablet =
    deviceMode === 'tablet' ||
    (deviceMode === 'auto' && windowWidth >= 768 && windowWidth < 1024);

  const isDesktop =
    deviceMode === 'desktop_standard' ||
    deviceMode === 'desktop_ultrawide' ||
    (deviceMode === 'auto' && windowWidth >= 1024);

  const isEmulator = deviceMode === 'android_emulator';

  const hapticFeedback = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <DeviceModeContext.Provider
      value={{
        deviceMode,
        setDeviceMode,
        isMobile,
        isTablet,
        isDesktop,
        isEmulator,
        performanceProfile,
        setPerformanceProfile,
        isNativeAppFrameVisible,
        setIsNativeAppFrameVisible,
        hapticFeedback
      }}
    >
      {children}
    </DeviceModeContext.Provider>
  );
};

export const useDeviceMode = () => {
  const context = useContext(DeviceModeContext);
  if (!context) {
    throw new Error('useDeviceMode must be used within a DeviceModeProvider');
  }
  return context;
};
