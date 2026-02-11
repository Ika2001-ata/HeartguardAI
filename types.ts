
export interface Vitals {
  heartRate: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  spo2: number;
  temperature: number;
  timestamp: number;
}

export interface Recommendation {
  category: 'diet' | 'exercise' | 'stress' | 'medical';
  title: string;
  description: string;
}

export enum AppState {
  DASHBOARD = 'DASHBOARD',
  ECG_HISTORY = 'ECG_HISTORY',
  ANALYTICS = 'ANALYTICS',
  CAREGIVER = 'CAREGIVER',
  SETTINGS = 'SETTINGS',
  ALERT = 'ALERT'
}

export interface Incident {
  id: string;
  time: string;
  type: string;
  severity: 'normal' | 'low' | 'high' | 'critical';
  message: string;
}
