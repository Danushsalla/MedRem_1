import Layout from '../components/layout/Layout';
import { useMedication } from '../context/MedicationContext';
import { formatDate } from '../utils/formatters';
import { Check, X, Calendar, Pill, Clock } from 'lucide-react';

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

  // Calculate stats
  const totalTaken = allHistory.filter(event => event.status === 'taken').length;
  const totalMissed = allHistory.filter(event => event.status === 'missed').length;
  const adherenceRate = allHistory.length > 0 ? Math.round((totalTaken / allHistory.length) * 100) : 0;

  const getMedicationIcon = (medicationName: string) => {
    // Create a simple visual representation based on medication name
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600', 
      'bg-purple-100 text-purple-600',
      'bg-orange-100 text-orange-600',
      'bg-pink-100 text-pink-600',
      'bg-teal-100 text-teal-600',
    ];
    
    const colorIndex = medicationName.length % colors.length;
    return colors[colorIndex];
  };

  return (
    <Layout title="History">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="bg-green-100 p-3 rounded-xl w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <Check className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalTaken}</p>
            <p className="text-xs text-gray-500">Taken</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="bg-red-100 p-3 rounded-xl w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <X className="text-red-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalMissed}</p>
            <p className="text-xs text-gray-500">Missed</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="bg-blue-100 p-3 rounded-xl w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">{adherenceRate}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{adherenceRate}%</p>
            <p className="text-xs text-gray-500">Adherence</p>
          </div>
        </div>

        {/* History Timeline */}
        {Object.keys(historyByDate).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(historyByDate).map(([date, events]) => (
              <div key={date} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="bg-gray-100 p-2 rounded-xl">
                    <Calendar className="text-gray-600" size={18} />
                  </div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    {formatDate(date)}
                  </h2>
                  <div className="flex-1"></div>
                  <div className="text-xs text-gray-500">
                    {events.length} medication{events.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Events List */}
                <div className="space-y-3">
                  {events.map((event, index) => (
                    <div
                      key={`${date}-${index}`}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      {/* Medication Icon */}
                      <div className={`p-2 rounded-xl ${getMedicationIcon(event.medicationName)}`}>
                        <Pill size={16} />
                      </div>

                      {/* Medication Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 text-sm">
                            {event.medicationName}
                          </p>
                          <span className="text-gray-400">•</span>
                          <p className="text-gray-600 text-sm">
                            {event.medicationDosage}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>Scheduled: {event.time}</span>
                          </div>
                          {event.takenAt && (
                            <>
                              <span>•</span>
                              <span className="text-green-600">Taken: {event.takenAt}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'taken' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {event.status === 'taken' ? (
                          <Check size={12} />
                        ) : (
                          <X size={12} />
                        )}
                        <span>{event.status === 'taken' ? 'Taken' : 'Missed'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="bg-gray-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="text-gray-400" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No History Yet</h3>
            <p className="text-gray-500 text-sm">
              Your medication history will appear here once you start taking your medications.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;