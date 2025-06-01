import { 
  Bell, 
  Volume2, 
  Vibrate,
  User,
  FileText,
  Lock,
  HelpCircle
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import SettingsItem from '../components/settings/SettingsItem';
import ToggleSwitch from '../components/settings/ToggleSwitch';
import { useMedication } from '../context/MedicationContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { settings, updateSettings } = useMedication();
  const navigate = useNavigate();

  const toggleReminders = () => {
    updateSettings({ remindersEnabled: !settings.remindersEnabled });
  };

  const toggleVibration = () => {
    updateSettings({ vibrationEnabled: !settings.vibrationEnabled });
  };

  return (
    <Layout title="Settings">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <div className="card divide-y divide-gray-100">
            <SettingsItem
              title="Reminders"
              description="Enable or disable medication reminders"
              icon={<Bell size={20} />}
              rightElement={
                <ToggleSwitch
                  enabled={settings.remindersEnabled}
                  onChange={toggleReminders}
                />
              }
            />
            
            <SettingsItem
              title="Reminder Sound"
              description="Choose a sound for your reminders"
              icon={<Volume2 size={20} />}
              rightElement={
                <span className="text-gray-600">Default</span>
              }
              onClick={() => {
                // In a real app, this would open a sound picker
                alert('Sound picker would open here');
              }}
            />
            
            <SettingsItem
              title="Vibration"
              description="Enable vibration for reminders"
              icon={<Vibrate size={20} />}
              rightElement={
                <ToggleSwitch
                  enabled={settings.vibrationEnabled}
                  onChange={toggleVibration}
                />
              }
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <div className="card divide-y divide-gray-100">
            <SettingsItem
              title="Profile"
              description="Manage your profile information"
              icon={<User size={20} />}
              onClick={() => navigate('/profile')}
            />
            
            <SettingsItem
              title="Terms of Service"
              description="View our terms of service"
              icon={<FileText size={20} />}
              onClick={() => navigate('/terms')}
            />
            
            <SettingsItem
              title="Privacy Policy"
              description="Read our privacy policy"
              icon={<Lock size={20} />}
              onClick={() => navigate('/privacy')}
            />
            
            <SettingsItem
              title="Help & Support"
              description="Get help or contact support"
              icon={<HelpCircle size={20} />}
              onClick={() => navigate('/help')}
            />
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>MedTracker v1.0.0</p>
          <p className="mt-1">© 2025 MedTracker App</p>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;