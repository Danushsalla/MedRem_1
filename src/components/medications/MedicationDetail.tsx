import { Check } from 'lucide-react';
import { Medication } from '../../types';
import { formatDate } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { useMedication } from '../../context/MedicationContext';

interface MedicationDetailProps {
  medication: Medication;
}

const MedicationDetail = ({ medication }: MedicationDetailProps) => {
  const navigate = useNavigate();
  const { removeMedication } = useMedication();

  const handleEdit = () => {
    navigate(`/medications/edit/${medication.id}`);
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this medication?')) {
      removeMedication(medication.id);
      navigate('/slots');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{medication.name}</h2>
        <p className="text-gray-700">Dosage: {medication.dosage}</p>
        <p className="text-gray-700">
          Schedule: {medication.frequency} at {medication.time}
        </p>
        <p className="text-gray-700">Assigned Slot: Slot {medication.slot}</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Reminder History</h3>
        <div className="space-y-2">
          {medication.history.length > 0 ? (
            medication.history.map((event, index) => (
              <div
                key={index}
                className="flex items-start p-3 border border-gray-200 rounded-lg"
              >
                <div
                  className={`flex-shrink-0 p-1 rounded-md ${
                    event.status === 'taken' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <Check
                    size={18}
                    className={
                      event.status === 'taken' ? 'text-green-600' : 'text-red-600'
                    }
                  />
                </div>
                <div className="ml-3">
                  <div className="font-medium">
                    {formatDate(event.date)} {event.time}
                  </div>
                  <div
                    className={`text-sm ${
                      event.status === 'taken' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {event.status === 'taken'
                      ? `Taken on time ${event.takenAt ? `at ${event.takenAt}` : ''}`
                      : 'Missed'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No history available yet.</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={handleEdit} className="btn btn-secondary flex-1">
          Edit
        </button>
        <button onClick={handleRemove} className="btn btn-danger flex-1">
          Remove
        </button>
      </div>
    </div>
  );
};

export default MedicationDetail;