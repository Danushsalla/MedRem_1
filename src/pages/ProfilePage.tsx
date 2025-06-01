import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Home } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Layout 
      title="Profile" 
      showBackButton 
      onBack={() => navigate(-1)}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center pb-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <User size={40} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-600">Patient ID: #123456</p>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="font-medium mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">John Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">john.doe@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">123 Main St, Anytown, ST 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-medium mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Contact Name</p>
                  <p className="font-medium">Jane Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/profile/edit')} 
            className="btn btn-primary w-full"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;