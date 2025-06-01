import { Home, Pill, History, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Slots', icon: Pill, path: '/slots' },
    { label: 'History', icon: History, path: '/history' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-3 px-4 transition-colors ${
              isActive(item.path) ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <item.icon
              size={24}
              className={isActive(item.path) ? 'text-primary-600' : ''}
            />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;