import { useParams, useNavigate } from 'react-router-dom';
import MedicationForm from '../components/medications/MedicationForm';
import { useMedication } from '../context/MedicationContext';
import Layout from '../components/layout/Layout';

const EditMedicationPage = () => {
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
  
  return <MedicationForm editId={id} />;
};

export default EditMedicationPage;