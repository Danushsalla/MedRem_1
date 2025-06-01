import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MedicationDetail from '../components/medications/MedicationDetail';
import { useMedication } from '../context/MedicationContext';

const MedicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMedicationById } = useMedication();
  
  const medication = id ? getMedicationById(id) : undefined;
  
  if (!medication) {
    return (
      <Layout title="Not Found">
        <div className="text-center py-10">
          <p className="text-gray-500">Medication not found.</p>
          <button 
            onClick={() => navigate('/slots')}
            className="btn btn-primary mt-4"
          >
            Go Back to Slots
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout 
      title="Medication Details" 
      showBackButton 
      onBack={() => navigate(-1)}
    >
      <MedicationDetail medication={medication} />
    </Layout>
  );
};

export default MedicationDetailPage;