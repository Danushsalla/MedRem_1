import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Medication, MedicationStatus, UserSettings } from '../types';
import { formatTime } from '../utils/formatters';

interface MedicationContextType {
  medications: Medication[];
  slots: Array<{ id: number; status: MedicationStatus; medication: Medication | null }>;
  settings: UserSettings;
  addMedication: (medication: Omit<Medication, 'id' | 'history'>) => void;
  updateMedication: (id: string, medication: Partial<Medication>) => void;
  removeMedication: (id: string) => void;
  getMedicationBySlot: (slot: number) => Medication | null;
  getMedicationById: (id: string) => Medication | undefined;
  markMedicationTaken: (id: string, date: string, time: string) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  remindersEnabled: true,
  reminderSound: 'default',
  vibrationEnabled: false,
};

const initialMedications: Medication[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'once daily',
    time: '8:00 AM',
    slot: 1,
    status: 'onTime',
    history: [
      { date: '2024-07-26', time: '8:00 AM', status: 'taken', takenAt: '8:03 AM' },
      { date: '2024-07-25', time: '8:00 AM', status: 'taken', takenAt: '8:01 AM' },
    ],
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'once daily',
    time: '12:00 PM',
    slot: 3,
    status: 'onTime',
    history: [
      { date: '2024-07-26', time: '12:00 PM', status: 'taken', takenAt: '12:05 PM' },
      { date: '2024-07-25', time: '12:00 PM', status: 'taken', takenAt: '12:02 PM' },
    ],
  },
  {
    id: '3',
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'once daily',
    time: '6:00 PM',
    slot: 4,
    status: 'missed',
    history: [
      { date: '2024-07-26', time: '6:00 PM', status: 'missed' },
      { date: '2024-07-25', time: '6:00 PM', status: 'taken', takenAt: '6:15 PM' },
    ],
  },
];

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medications, setMedications] = useState<Medication[]>(() => {
    const savedMedications = localStorage.getItem('medications');
    return savedMedications ? JSON.parse(savedMedications) : initialMedications;
  });
  
  const [settings, setSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const generateSlots = () => {
    const slots = Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      status: 'empty' as MedicationStatus,
      medication: null,
    }));

    medications.forEach((med) => {
      if (med.slot > 0 && med.slot <= 4) {
        slots[med.slot - 1] = {
          id: med.slot,
          status: med.status,
          medication: med,
        };
      }
    });

    return slots;
  };

  const slots = generateSlots();

  const addMedication = (medication: Omit<Medication, 'id' | 'history'>) => {
    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString(),
      history: [],
    };
    
    setMedications((prev) => [...prev, newMedication]);
  };

  const updateMedication = (id: string, medication: Partial<Medication>) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, ...medication } : med))
    );
  };

  const removeMedication = (id: string) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  const getMedicationBySlot = (slot: number) => {
    return medications.find((med) => med.slot === slot) || null;
  };

  const getMedicationById = (id: string) => {
    return medications.find((med) => med.id === id);
  };

  const markMedicationTaken = (id: string, date: string, time: string) => {
    const now = new Date();
    const formattedTime = formatTime(now);
    
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const newHistory = [
            { date, time, status: 'taken' as const, takenAt: formattedTime },
            ...med.history,
          ];
          
          return {
            ...med,
            status: 'onTime',
            history: newHistory,
          };
        }
        return med;
      })
    );
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <MedicationContext.Provider
      value={{
        medications,
        slots,
        settings,
        addMedication,
        updateMedication,
        removeMedication,
        getMedicationBySlot,
        getMedicationById,
        markMedicationTaken,
        updateSettings,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};