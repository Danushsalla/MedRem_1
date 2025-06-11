import { Pill, Bell, PlusCircle, Smile } from 'lucide-react';
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

  return (
    <Layout title="MedRem">
      <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        {/* Personalized Greeting */}
        <div className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-xl p-6 shadow-md flex items-center gap-4 max-w-4xl mx-auto">
          <Smile className="text-blue-600" size={36} />
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-1">
              Good day, {userName}!
            </h2>
            <p className="text-blue-800">
              Track your medications, get reminders, and never miss a dose again.
            </p>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="bg-white rounded-xl p-6 shadow max-w-4xl mx-auto mt-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Today's Summary
          </h2>
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <span className="text-3xl font-bold text-green-700">{takenToday.length}</span>
              <span className="text-gray-700 ml-1">taken</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-red-700">{missedToday.length}</span>
              <span className="text-gray-700 ml-1">missed</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-gray-700">{todayMeds.length}</span>
              <span className="text-gray-700 ml-1">total</span>
            </div>
            <div className="flex-1 min-w-[140px]">
              <div className="h-3 bg-gray-200 rounded-full mt-3">
                <div
                  className="h-3 rounded-full bg-green-500 transition-all"
                  style={{ width: `${adherence}%` }}
                  aria-label={`Adherence: ${Math.round(adherence)}%`}
                />
              </div>
              <span className="text-xs text-gray-600">{Math.round(adherence)}% adherence</span>
            </div>
          </div>
        </div>

        {/* Missed Medications Alert */}
        {missedMedications.length > 0 && (
          <div className="bg-red-100 rounded-xl p-5 shadow max-w-4xl mx-auto mt-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <Bell className="text-red-600 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-red-800 text-lg">
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

        {/* Upcoming Medications */}
        <div className="bg-white rounded-xl p-6 shadow max-w-4xl mx-auto mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Medications</h2>
            <button 
              onClick={() => navigate('/slots')}
              className="text-primary-600 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
              aria-label="View all slots"
              title="View all slots"
            >
              View All
            </button>
          </div>
          
          {upcomingMedications.length > 0 ? (
            <div className="space-y-4">
              {upcomingMedications.map((med) => (
                <div 
                  key={med.id} 
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-shadow shadow-sm"
                  onClick={() => navigate(`/medications/${med.id}`)}
                  tabIndex={0}
                  aria-label={`Open details for ${med.name}`}
                  title={`Open details for ${med.name}`}
                >
                  <Pill className="text-primary-600 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-medium text-gray-900">{med.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {med.dosage} &middot; {med.time}
                      <span className="text-blue-700 ml-2">{getTimeUntil(med.time)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 text-gray-500">
              <Pill size={36} className="mb-3" />
              <p className="text-lg">No upcoming medications</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-6 flex-col sm:flex-row max-w-4xl mx-auto mt-8">
          <button
            onClick={() => navigate('/medications/add')}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl shadow-md flex flex-col items-center justify-center transition focus:outline-none focus:ring-4 focus:ring-primary-400"
            aria-label="Add Medication"
            title="Add Medication"
          >
            <PlusCircle size={32} className="mb-2" />
            <span className="font-semibold text-lg">Add Medication</span>
          </button>
          
          <button
            onClick={() => navigate('/slots')}
            className="flex-1 bg-white border border-primary-600 text-primary-600 py-4 rounded-xl shadow-md flex flex-col items-center justify-center transition hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-400"
            aria-label="View Slots"
            title="View Slots"
          >
            <div className="relative mb-2">
              <Pill size={32} />
              {emptySlotCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {emptySlotCount}
                </span>
              )}
            </div>
            <span className="font-semibold text-lg">View Slots</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
