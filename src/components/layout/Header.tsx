import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header = ({ title, showBackButton, onBack }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center relative">
        {showBackButton && (
          <button
            onClick={onBack}
            className="absolute left-4 p-1 rounded-full hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;