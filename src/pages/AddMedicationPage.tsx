import Layout from '../components/layout/Layout';
import MedicationForm from '../components/medications/MedicationForm';
import { useNavigate } from 'react-router-dom';

const AddMedicationPage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout 
      title="Add Medication" 
      showBackButton 
      onBack={() => navigate(-1)}
    >
      <MedicationForm />
    </Layout>
  );
};

export default AddMedicationPage;