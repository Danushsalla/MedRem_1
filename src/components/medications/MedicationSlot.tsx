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

  // Get background color based on slot number and status
  const getBackgroundColor = () => {
    if (status === 'empty') {
      const emptyColors = [
        'bg-gray-200', 'bg-gray-300', 'bg-slate-200', 'bg-stone-200'
      ];
      return emptyColors[slotNumber % emptyColors.length];
    }
    
    if (status === 'missed') {
      return 'bg-gradient-to-br from-gray-800 to-gray-900';
    }
    
    // On time colors - vibrant backgrounds
    const colors = [
      'bg-gradient-to-br from-teal-400 to-teal-500',
      'bg-gradient-to-br from-cyan-400 to-cyan-600', 
      'bg-gradient-to-br from-blue-100 to-blue-200',
      'bg-gradient-to-br from-gray-800 to-gray-900'
    ];
    
    return colors[(slotNumber - 1) % colors.length];
  };

  const getPillOrganizerImage = () => {
    if (status === 'empty') {
      return (
        <div className="w-16 h-12 mx-auto mb-3 flex items-center justify-center">
          <div className="w-12 h-8 border-2 border-gray-400 rounded-md bg-white/20 flex">
            <div className="flex-1 border-r border-gray-400"></div>
            <div className="flex-1 border-r border-gray-400"></div>
            <div className="flex-1 border-r border-gray-400"></div>
            <div className="flex-1"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-16 h-12 mx-auto mb-3 flex items-center justify-center">
        <div className="w-12 h-8 bg-white/90 rounded-md shadow-sm flex items-center justify-center relative">
          <div className="grid grid-cols-2 gap-1 p-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
          {status === 'missed' && (
            <div className="absolute inset-0 bg-red-500/20 rounded-md"></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`${getBackgroundColor()} rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg min-h-[160px] flex flex-col justify-between`}
      onClick={onClick}
    >
      <div className="flex-1 flex flex-col justify-center">
        {getPillOrganizerImage()}
        
        <div className="text-center">
          <h3 className={`font-semibold text-sm mb-1 ${
            status === 'empty' ? 'text-gray-600' : 
            status === 'missed' ? 'text-white' : 
            'text-gray-800'
          }`}>
            Slot {slotNumber}: {getStatusText(status)}
          </h3>
          
          {medication ? (
            <div className={`text-xs ${
              status === 'missed' ? 'text-gray-200' : 'text-gray-600'
            }`}>
              <p className="font-medium">{medication.name} {medication.dosage}</p>
              <p>{medication.time}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500">Empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationSlot;