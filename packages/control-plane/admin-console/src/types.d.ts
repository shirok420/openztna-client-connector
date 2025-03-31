// Global type definitions for the application

declare namespace React {
  interface ReactNode {}
  interface SyntheticEvent<T = Element> {
    nativeEvent: Event;
    currentTarget: EventTarget & T;
    target: EventTarget & T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Device types
interface Device {
  id: number;
  name: string;
  user: string;
  os: string;
  lastSeen: string;
  status: string;
  ipAddress: string;
  macAddress: string;
  serialNumber: string;
}

// Policy types
interface DeviceSecurityRequirements {
  diskEncryption: boolean;
  firewallEnabled: boolean;
  antivirusEnabled: boolean;
  screenLockEnabled: boolean;
  minOsVersion: {
    windows: string;
    macos: string;
    ios: string;
    android: string;
  };
}

interface AuthenticationRequirements {
  mfaRequired: boolean;
  passwordComplexity: string;
  passwordExpiryDays: number;
  failedLoginAttempts: number;
}

interface NetworkSecurityRequirements {
  vpnRequired: boolean;
  restrictedNetworks: string[];
  allowedCountries: string[];
}

interface PolicyRequirements {
  deviceSecurity: DeviceSecurityRequirements;
  authentication: AuthenticationRequirements;
  networkSecurity: NetworkSecurityRequirements;
}

interface Policy {
  id: number;
  name: string;
  description: string;
  status: string;
  appliesTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  requirements: PolicyRequirements;
}