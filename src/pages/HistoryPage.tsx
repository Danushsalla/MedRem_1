import Layout from '../components/layout/Layout';
import { useMedication } from '../context/MedicationContext';
import { formatDate } from '../utils/formatters';
import { Check, X } from 'lucide-react';

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
      // Sort by date (newest first)
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

  return (
    <Layout title="History">
      <div className="space-y-6">
        {Object.keys(historyByDate).length > 0 ? (
          Object.entries(historyByDate).map(([date, events]) => (
            <div key={date} className="space-y-3">
              <h2 className="font-semibold text-lg text-gray-700">
                {formatDate(date)}
              </h2>
              <div className="space-y-2">
                {events.map((event, index) => (
                  <div
                    key={`${date}-${index}`}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        event.status === 'taken' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {event.status === 'taken' ? (
                        <Check className="text-green-600\" size={16} />
                      ) : (
                        <X className="text-red-600" size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {event.medicationName} {event.medicationDosage}
                      </p>
                      <div className="flex justify-between">
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
            </div>
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