import { Pill, Bell, PlusCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useMedication } from '../context/MedicationContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { medications, slots } = useMedication();
  const navigate = useNavigate();
  
  const upcomingMedications = medications
    .filter(med => med.status !== 'empty')
    .sort((a, b) => {
      return a.time.localeCompare(b.time);
    })
    .slice(0, 3);

  const emptySlotCount = slots.filter(slot => slot.status === 'empty').length;
  const missedMedications = medications.filter(med => med.status === 'missed');

  return (
    <Layout title="MedRem">
      <div className="space-y-6">
        <div className="bg-primary-100 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-800 mb-2">
            Welcome to MedRem
          </h2>
          <p className="text-primary-700">
            Track your medications, get reminders, and never miss a dose again.
          </p>
        </div>

        {missedMedications.length > 0 && (
          <div className="bg-red-100 rounded-xl p-5 shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <Bell className="text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800">
                  {missedMedications.length} Missed Medication
                  {missedMedications.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-red-700 text-sm mt-1">
                  You have missed some medications. Check your slots to take them.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Upcoming Medications</h2>
            <button 
              onClick={() => navigate('/slots')}
              className="text-primary-600 text-sm"
            >
              View All
            </button>
          </div>
          
          {upcomingMedications.length > 0 ? (
            <div className="space-y-3">
              {upcomingMedications.map((med) => (
                <div 
                  key={med.id} 
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/medications/${med.id}`)}
                >
                  <Pill className={`text-primary-600 flex-shrink-0`} />
                  <div>
                    <h3 className="font-medium">{med.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {med.dosage} - {med.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No upcoming medications
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/medications/add')}
            className="card card-interactive flex-1 py-4 flex flex-col items-center justify-center"
          >
            <PlusCircle className="text-primary-600 mb-2" size={28} />
            <span className="font-medium">Add Medication</span>
          </button>
          
          <button
            onClick={() => navigate('/slots')}
            className="card card-interactive flex-1 py-4 flex flex-col items-center justify-center"
          >
            <div className="relative mb-2">
              <Pill className="text-primary-600" size={28} />
              {emptySlotCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {emptySlotCount}
                </span>
              )}
            </div>
            <span className="font-medium">View Slots</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;