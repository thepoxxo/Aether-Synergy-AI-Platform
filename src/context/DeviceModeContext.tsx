import React, { createContext, useContext, useState, useEffect } from 'react';

export type DeviceMode = 'auto' | 'desktop' | 'mobile_preview' | 'tablet_preview';

interface DeviceModeContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSimulatorModalOpen: boolean;
  setIsSimulatorModalOpen: (open: boolean) => void;
  hapticFeedback: () => void;
}

const DeviceModeContext = createContext<DeviceModeContextType | undefined>(undefined);

export const DeviceModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceMode, setDeviceModeState] = useState<DeviceMode>('auto');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setDeviceMode = (mode: DeviceMode) => {
    setDeviceModeState(mode);
  };

  // Real mobile detection (screen width under 768px or simulator preview)
  const isMobile = windowWidth < 768 || deviceMode === 'mobile_preview';
  const isTablet = (windowWidth >= 768 && windowWidth < 1024) || deviceMode === 'tablet_preview';
  const isDesktop = windowWidth >= 1024 && deviceMode !== 'mobile_preview' && deviceMode !== 'tablet_preview';

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
        isSimulatorModalOpen,
        setIsSimulatorModalOpen,
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
