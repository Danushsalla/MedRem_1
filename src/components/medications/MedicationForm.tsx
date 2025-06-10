import { useState } from 'react';
import { useMedication } from '../../context/MedicationContext';
import { MedicationFrequency } from '../../types';
import { useNavigate } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';

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
    beforeAfterFood: 'before',
    additionalInstructions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const beforeAfterOptions = [
    { value: 'before', label: 'Before Food' },
    { value: 'after', label: 'After Food' },
    { value: 'with', label: 'With Food' },
    { value: 'anytime', label: 'Anytime' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Add Medication</h1>
        <div className="w-10"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Medication Name */}
        <div>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Medication Name"
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base"
          />
        </div>
        
        {/* Dosage */}
        <div>
          <input
            type="text"
            name="dosage"
            required
            value={formData.dosage}
            onChange={handleChange}
            placeholder="Dosage (e.g., 200mg)"
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base"
          />
        </div>
        
        {/* Frequency */}
        <div className="relative">
          <select
            name="frequency"
            required
            value={formData.frequency}
            onChange={handleChange}
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl border-0 text-gray-900 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base appearance-none pr-12"
          >
            {frequencyOptions.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
        </div>
        
        {/* Time */}
        <div>
          <input
            type="text"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            placeholder="Time (e.g., 8:00 AM)"
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base"
          />
        </div>
        
        {/* Slot */}
        <div className="relative">
          <select
            name="slot"
            required
            value={formData.slot}
            onChange={handleChange}
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl border-0 text-gray-900 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base appearance-none pr-12"
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
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
        </div>
        
        {/* Before/After Food */}
        <div className="relative">
          <select
            name="beforeAfterFood"
            value={formData.beforeAfterFood}
            onChange={handleChange}
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl border-0 text-gray-900 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base appearance-none pr-12"
          >
            {beforeAfterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
        </div>
        
        {/* Additional Instructions */}
        <div>
          <textarea
            name="additionalInstructions"
            value={formData.additionalInstructions}
            onChange={handleChange}
            placeholder="Additional Instructions"
            rows={4}
            className="w-full px-4 py-4 bg-gray-100 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base resize-none"
          />
        </div>
        
        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold text-base hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg"
          >
            {editId ? 'Update Medication' : 'Add Medication'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicationForm;