interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  label?: string;
}

const ToggleSwitch = ({ enabled, onChange, label }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center">
      {label && <span className="mr-3">{label}</span>}
      <button
        type="button"
        className={`${
          enabled ? 'bg-primary-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
        role="switch"
        aria-checked={enabled}
        onClick={onChange}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;