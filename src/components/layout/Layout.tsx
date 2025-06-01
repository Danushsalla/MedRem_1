import { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Layout = ({ children, title, showBackButton, onBack }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {title && (
        <Header title={title} showBackButton={showBackButton} onBack={onBack} />
      )}
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-4 py-4">{children}</div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;