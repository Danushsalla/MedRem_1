import { Pill } from 'lucide-react';
import { Medication } from '../../types';
import { getStatusClass, getStatusText } from '../../utils/formatters';
import { useState } from 'react';
import { useMedication } from '../../context/MedicationContext';

interface MedicationSlotProps {
  slotNumber: number;
  status: string;
  medication: Medication | null;
  onClick: () => void;
}

const MedicationSlot = ({ 
  slotNumber, 
  status, 
  medication, 
  onClick 
}: MedicationSlotProps) => {
  const [animate, setAnimate] = useState(false);
  const { markMedicationTaken } = useMedication();

  const handleTakeMedication = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (medication && status !== 'empty') {
      setAnimate(true);
      const today = new Date().toISOString().split('T')[0];
      markMedicationTaken(medication.id, today, medication.time);
      
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
  };

  return (
    <div 
      className="card card-interactive w-full" 
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div 
          className={`${animate ? 'animate-pill-taken' : ''}`}
          onClick={handleTakeMedication}
        >
          <Pill 
            size={24} 
            className={`pill-icon ${getStatusClass(status)}`} 
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">
              Slot {slotNumber}: {getStatusText(status)}
            </h3>
          </div>
          {medication ? (
            <p className="text-gray-600 mt-1">
              {medication.name} {medication.dosage} - {medication.time}
            </p>
          ) : (
            <p className="text-gray-500 mt-1">Empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationSlot;