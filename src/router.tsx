import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SlotsPage from './pages/SlotsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import AddMedicationPage from './pages/AddMedicationPage';
import EditMedicationPage from './pages/EditMedicationPage';
import MedicationDetailPage from './pages/MedicationDetailPage';
import ProfilePage from './pages/ProfilePage';
import TermsPage from './pages/TermsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/slots',
    element: <SlotsPage />,
  },
  {
    path: '/history',
    element: <HistoryPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/medications/add',
    element: <AddMedicationPage />,
  },
  {
    path: '/medications/edit/:id',
    element: <EditMedicationPage />,
  },
  {
    path: '/medications/:id',
    element: <MedicationDetailPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
]);

export default router;