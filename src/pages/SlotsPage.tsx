import { Plus, Pill } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MedicationSlot from '../components/medications/MedicationSlot';
import { useMedication } from '../context/MedicationContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SlotsPage = () => {
  const { slots, loading } = useMedication();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const filledSlots = slots.filter(slot => slot.medication);
  const totalSlots = slots.length;

  const handleSlotClick = (slotId: number, medicationId?: string) => {
    try {
      if (medicationId) {
        navigate(`/medications/${medicationId}`);
      } else {
        navigate('/medications/add', { state: { slotId } });
      }
    } catch (err) {
      setError('Failed to navigate. Please try again.');
    }
  };

  return (
    <Layout title="Medication Slots">
      <div className="grid grid-cols-2 gap-4 pb-4">
        {slots.map((slot) => (
          <MedicationSlot
            key={slot.id}
            slotNumber={slot.id}
            status={slot.status}
            medication={slot.medication}
            onClick={() => 
              handleSlotClick(slot.id, slot.medication?.id)
            }
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Loading State */}
        {loading && (
          <div className="col-span-full text-center text-gray-500 py-8">
            <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p>Loading slots...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="col-span-full text-center text-red-600 py-2">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && slots.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            <span role="img" aria-label="Empty">🗂️</span>
            <p>No medication slots available.</p>
          </div>
        )}

        {/* Slots List */}
        {!loading &&
          slots.map((slot) => (
            <div
              key={slot.id}
              className={`p-4 rounded-xl shadow border flex items-center gap-4 transition hover:shadow-lg cursor-pointer ${
                slot.medication ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleSlotClick(slot.id, slot.medication?.id)}
              tabIndex={0}
              role="button"
              aria-label={slot.medication ? `View medication in slot ${slot.id}` : `Add medication to slot ${slot.id}`}
              title={slot.medication ? 'View medication' : 'Add medication'}
            >
              <div>
                {slot.medication ? (
                  <Pill className="text-green-600" size={28} />
                ) : (
                  <Pill className="text-gray-400" size={28} />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">
                  Slot {slot.id}
                </div>
                {slot.medication ? (
                  <>
                    <div className="text-green-800 font-medium">{slot.medication.name}</div>
                    <div className="text-gray-600 text-sm">{slot.medication.dosage}</div>
                    {slot.medication.time && (
                      <div className="text-blue-700 text-xs mt-1">
                        Scheduled: {slot.medication.time}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-gray-500 text-sm">Empty</div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => navigate('/medications/add')}
          className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-label="Add medication"
          title="Add medication"
        >
          <Plus size={24} />
        </button>
      </div>
    </Layout>
  );
};

export default SlotsPage;
