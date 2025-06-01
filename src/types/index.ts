export type MedicationStatus = 'onTime' | 'missed' | 'empty';

export type MedicationFrequency = 
  | 'once daily' 
  | 'twice daily' 
  | 'three times daily' 
  | 'four times daily'
  | 'every other day'
  | 'weekly'
  | 'as needed';

export interface ReminderEvent {
  date: string;
  time: string;
  status: 'taken' | 'missed';
  takenAt?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: MedicationFrequency;
  time: string;
  slot: number;
  status: MedicationStatus;
  history: ReminderEvent[];
}

export interface UserSettings {
  remindersEnabled: boolean;
  reminderSound: string;
  vibrationEnabled: boolean;
}