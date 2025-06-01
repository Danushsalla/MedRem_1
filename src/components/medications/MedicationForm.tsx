import { useState } from 'react';
import { useMedication } from '../../context/MedicationContext';
import { MedicationFrequency } from '../../types';
import { useNavigate } from 'react-router-dom';

interface MedicationFormProps {
  editId?: string;
}

const MedicationForm = ({ editId }: MedicationFormProps) => {
  const { addMedication, updateMedication, getMedicationById, slots } = useMedication();
  const navigate = useNavigate();
  
  const emptySlots = slots.filter(slot => slot.status === 'empty').map(slot => slot.id);
  const existingMedication = editId ? getMedicationById(editId) : undefined;
  
  const [formData, setFormData] = useState({
    name: existingMedication?.name || '',
    dosage: existingMedication?.dosage || '',
    frequency: existingMedication?.frequency || 'once daily' as MedicationFrequency,
    time: existingMedication?.time || '',
    slot: existingMedication?.slot || (emptySlots.length > 0 ? emptySlots[0] : 1),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'slot' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editId) {
      updateMedication(editId, { ...formData, status: 'onTime' });
    } else {
      addMedication({ ...formData, status: 'onTime' });
    }
    
    navigate('/slots');
  };

  const frequencyOptions = [
    'once daily',
    'twice daily',
    'three times daily',
    'four times daily',
    'every other day',
    'weekly',
    'as needed',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Medication Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Medication Name"
          className="input"
        />
      </div>
      
      <div>
        <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
          Dosage
        </label>
        <input
          type="text"
          id="dosage"
          name="dosage"
          required
          value={formData.dosage}
          onChange={handleChange}
          placeholder="Dosage (e.g., 200mg)"
          className="input"
        />
      </div>
      
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
          Frequency
        </label>
        <div className="relative">
          <select
            id="frequency"
            name="frequency"
            required
            value={formData.frequency}
            onChange={handleChange}
            className="input appearance-none pr-10"
          >
            {frequencyOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
          Time
        </label>
        <input
          type="text"
          id="time"
          name="time"
          required
          value={formData.time}
          onChange={handleChange}
          placeholder="Time (e.g., 8:00 AM)"
          className="input"
        />
      </div>
      
      <div>
        <label htmlFor="slot" className="block text-sm font-medium text-gray-700 mb-1">
          Slot
        </label>
        <div className="relative">
          <select
            id="slot"
            name="slot"
            required
            value={formData.slot}
            onChange={handleChange}
            className="input appearance-none pr-10"
          >
            {existingMedication && (
              <option value={existingMedication.slot}>
                Slot {existingMedication.slot} (Current)
              </option>
            )}
            {emptySlots
              .filter(slotId => slotId !== existingMedication?.slot)
              .map(slotId => (
                <option key={slotId} value={slotId}>
                  Slot {slotId}
                </option>
              ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary w-full mt-6">
        {editId ? 'Update Medication' : 'Add Medication'}
      </button>
    </form>
  );
};

export default MedicationForm;