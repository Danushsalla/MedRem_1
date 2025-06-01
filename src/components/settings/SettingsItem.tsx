import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface SettingsItemProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  onClick?: () => void;
}

const SettingsItem = ({
  title,
  description,
  icon,
  rightElement,
  onClick,
}: SettingsItemProps) => {
  return (
    <div
      className={`py-4 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="text-gray-500">{icon}</div>}
          <div>
            <h3 className="font-medium">{title}</h3>
            {description && <p className="text-gray-500 text-sm">{description}</p>}
          </div>
        </div>
        {rightElement || (
          onClick && <ChevronRight size={20} className="text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default SettingsItem;