import { 
  Bell, 
  Volume2, 
  Vibrate,
  User,
  FileText,
  Lock,
  HelpCircle,
  Settings
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import SettingsItem from '../components/settings/SettingsItem';
import ToggleSwitch from '../components/settings/ToggleSwitch';
import { useMedication } from '../context/MedicationContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SettingsPage = () => {
  const { settings, updateSettings } = useMedication();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<string | null>(null);

  const toggleReminders = () => {
    updateSettings({ remindersEnabled: !settings.remindersEnabled });
    setFeedback(`Reminders ${!settings.remindersEnabled ? 'enabled' : 'disabled'}`);
    setTimeout(() => setFeedback(null), 1200);
  };

  const toggleVibration = () => {
    updateSettings({ vibrationEnabled: !settings.vibrationEnabled });
    setFeedback(`Vibration ${!settings.vibrationEnabled ? 'enabled' : 'disabled'}`);
    setTimeout(() => setFeedback(null), 1200);
  };

  return (
    <Layout title="Settings">
      <div className="space-y-8">
        {/* Feedback Toast */}
        {feedback && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow z-50 animate-fade-in">
            {feedback}
          </div>
        )}

        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <Settings className="text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingsItem
              title="Reminders"
              description="Enable or disable medication reminders"
              icon={<Bell size={20} />}
              rightElement={
                <ToggleSwitch
                  enabled={settings.remindersEnabled}
                  onChange={toggleReminders}
                  aria-label="Toggle reminders"
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
                alert('Sound picker would open here');
              }}
              aria-label="Pick reminder sound"
            />
            <SettingsItem
              title="Vibration"
              description="Enable vibration for reminders"
              icon={<Vibrate size={20} />}
              rightElement={
                <ToggleSwitch
                  enabled={settings.vibrationEnabled}
                  onChange={toggleVibration}
                  aria-label="Toggle vibration"
                />
              }
            />
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <User className="text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold">Account</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingsItem
              title="Profile"
              description="Manage your profile information"
              icon={<User size={20} />}
              onClick={() => navigate('/profile')}
              aria-label="Manage profile"
            />
            <SettingsItem
              title="Terms of Service"
              description="View our terms of service"
              icon={<FileText size={20} />}
              onClick={() => navigate('/terms')}
              aria-label="View terms of service"
            />
            <SettingsItem
              title="Privacy Policy"
              description="Read our privacy policy"
              icon={<Lock size={20} />}
              onClick={() => navigate('/privacy')}
              aria-label="Read privacy policy"
            />
            <SettingsItem
              title="Help & Support"
              description="Get help or contact support"
              icon={<HelpCircle size={20} />}
              onClick={() => navigate('/help')}
              aria-label="Help and support"
            />
          </div>
        </div>
        
        {/* Version */}
        <div className="border-t pt-4 text-center text-gray-400 text-sm mt-8">
          <p>MedTracker v1.0.0</p>
          <p className="mt-1">© 2025 MedTracker App</p>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
