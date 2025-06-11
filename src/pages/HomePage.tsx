import { Pill, Bell, PlusCircle, Clock, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useMedication } from '../context/MedicationContext';
import { useNavigate } from 'react-router-dom';

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => new Date().toISOString().split('T')[0];

// Helper to show time until next dose
const getTimeUntil = (medTime: string) => {
  const now = new Date();
  const [hours, minutes] = medTime.split(':').map(Number);
  const medDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  const diffMs = medDate.getTime() - now.getTime();
  if (diffMs < 0) return 'Due';
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 60) return `in ${diffMins} min`;
  return `in ${Math.floor(diffMins / 60)} hr ${diffMins % 60} min`;
};

const HomePage = () => {
  const { medications, slots } = useMedication();
  // @ts-expect-error: user may not exist on MedicationContextType
  const user = useMedication().user;
  const navigate = useNavigate();

  const userName = user?.name || "there";
  const today = getTodayString();

  // Adjust according to your medication object structure
  const todayMeds = medications.filter(med => (med as any).scheduledDate === today);
  // Replace 'taken' and 'missed' with the correct MedicationStatus values if imported, e.g., MedicationStatus.TAKEN
  const takenToday = todayMeds.filter(med => med.status === "taken" as typeof med.status);
  const missedToday = todayMeds.filter(med => med.status === "missed" as typeof med.status);
  const adherence = todayMeds.length > 0 ? (takenToday.length / todayMeds.length) * 100 : 0;

  const upcomingMedications = medications
    .filter(med => med.status !== 'empty' && (med as any).scheduledDate === today && med.time)
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 3);

  const emptySlotCount = slots.filter(slot => slot.status === 'empty').length;
  const missedMedications = medications.filter(med => med.status === 'missed');
  const onTimeMedications = medications.filter(med => med.status === 'onTime');

  return (
    <Layout title="MedRem">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{onTimeMedications.length}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Pill size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Missed</p>
                <p className="text-2xl font-bold">{missedMedications.length}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <AlertTriangle size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Missed Medications Alert */}
        {missedMedications.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-xl">
                <Bell className="text-red-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 text-sm">
                  {missedMedications.length} Missed Medication{missedMedications.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-red-600 text-xs mt-1">
                  You have missed some medications. Check your slots to take them.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Clock className="text-blue-600" size={20} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            </div>
            <button 
              onClick={() => navigate('/slots')}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
            >
              View All
            </button>
          </div>
          
          {upcomingMedications.length > 0 ? (
            <div className="space-y-4">
              {upcomingMedications.map((med) => (
                <div 
                  key={med.id} 
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(`/medications/${med.id}`)}
                  tabIndex={0}
                  aria-label={`Open details for ${med.name}`}
                  title={`Open details for ${med.name}`}
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Pill className="text-blue-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{med.name}</h3>
                    <p className="text-gray-500 text-xs">
                      {med.dosage} • {med.time}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    med.status === 'onTime' ? 'bg-green-100 text-green-700' :
                    med.status === 'missed' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {med.status === 'onTime' ? 'On Time' : 
                     med.status === 'missed' ? 'Missed' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 p-4 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Pill className="text-gray-400" size={24} />
              </div>
              <p className="text-gray-500 text-sm">No medications scheduled for today</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/medications/add')}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <PlusCircle className="text-blue-600" size={24} />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Add Medication</span>
              <p className="text-gray-500 text-xs mt-1">Create new reminder</p>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/slots')}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <div className="text-center">
              <div className="bg-teal-100 p-4 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center relative">
                <Pill className="text-teal-600" size={24} />
                {emptySlotCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {emptySlotCount}
                  </span>
                )}
              </div>
              <span className="font-semibold text-gray-900 text-sm">View Slots</span>
              <p className="text-gray-500 text-xs mt-1">
                {emptySlotCount > 0 ? `${emptySlotCount} empty slots` : 'All slots are full'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
