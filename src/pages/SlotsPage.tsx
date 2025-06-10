import { Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MedicationSlot from '../components/medications/MedicationSlot';
import { useMedication } from '../context/MedicationContext';
import { useNavigate } from 'react-router-dom';

const SlotsPage = () => {
  const { slots } = useMedication();
  const navigate = useNavigate();

  const handleSlotClick = (slotId: number, medicationId?: string) => {
    if (medicationId) {
      navigate(`/medications/${medicationId}`);
    } else {
      navigate('/medications/add', { state: { slotId } });
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
      
      <div className="fixed bottom-20 right-4">
        <button
          onClick={() => navigate('/medications/add')}
          className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Add medication"
        >
          <Plus size={24} />
        </button>
      </div>
    </Layout>
  );
};

export default SlotsPage;