
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
  HISTORY = 'HISTORY',
  CAREGIVER = 'CAREGIVER',
  SETTINGS = 'SETTINGS'
}
