import { RouterProvider } from 'react-router-dom';
import router from './router';
import { MedicationProvider } from './context/MedicationContext';

function App() {
  return (
    <MedicationProvider>
      <RouterProvider router={router} />
    </MedicationProvider>
  );
}

export default App;