import Layout from '../components/layout/Layout';
import { useMedication } from '../context/MedicationContext';
import { formatDate } from '../utils/formatters';
import { Check, X } from 'lucide-react';

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const HistoryPage = () => {
  const { medications } = useMedication();

  // Flatten all history events from all medications
  const allHistory = medications
    .flatMap(med =>
      med.history.map(event => ({
        ...event,
        medicationName: med.name,
        medicationDosage: med.dosage,
        medicationId: med.id,
      }))
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });

  // Group history by date
  const historyByDate = allHistory.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, typeof allHistory>);

  // --- SUMMARY LOGIC ---
  const todayStr = getTodayString();
  const todayEvents = historyByDate[todayStr] || [];
  const takenCount = todayEvents.filter(e => e.status === 'taken').length;
  const totalCount = todayEvents.length;
  const adherence = totalCount > 0 ? (takenCount / totalCount) * 100 : 0;

  return (
    <Layout title="History">
      <div className="space-y-6">
        {/* --- SUMMARY AT THE TOP --- */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between mb-2">
          <span className="font-bold text-xl text-blue-700">
            {totalCount > 0
              ? `You took ${takenCount}/${totalCount} medications today.`
              : "No medications scheduled for today."}
          </span>
          {totalCount > 0 && (
            <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 rounded-full bg-green-400 transition-all"
                  style={{ width: `${adherence}%` }}
                  aria-label={`Adherence: ${Math.round(adherence)}%`}
                />
              </div>
              <span className="text-xs text-gray-600">{Math.round(adherence)}% adherence</span>
            </div>
          )}
        </div>

        {/* --- HISTORY LIST --- */}
        {Object.keys(historyByDate).length > 0 ? (
          Object.entries(historyByDate).map(([date, events]) => (
            <section key={date} className="space-y-3" aria-label={`History for ${formatDate(date)}`}>
              <h2 className="font-semibold text-lg text-gray-700">
                {formatDate(date)}
              </h2>
              <div className="space-y-2">
                {events.map((event, index) => (
                  <div
                    key={`${date}-${index}`}
                    className="flex items-center p-4 bg-white rounded-xl shadow border border-gray-100"
                    aria-label={`Medication event: ${event.medicationName} at ${event.time}`}
                  >
                    <div
                      className={`p-3 rounded-full mr-4 flex items-center justify-center ${
                        event.status === 'taken' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                      title={event.status === 'taken' ? 'Taken' : 'Missed'}
                    >
                      {event.status === 'taken' ? (
                        <Check className="text-green-600" size={20} aria-label="Taken" />
                      ) : (
                        <X className="text-red-600" size={20} aria-label="Missed" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg">
                        {event.medicationName} <span className="font-normal">{event.medicationDosage}</span>
                        <span className={`ml-3 px-2 py-1 rounded text-xs font-semibold ${event.status === 'taken' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {event.status === 'taken' ? 'Taken' : 'Missed'}
                        </span>
                      </p>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-600">
                          Scheduled: {event.time}
                        </p>
                        {event.takenAt && (
                          <p className="text-sm text-green-600">
                            Taken: {event.takenAt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No medication history available yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;
