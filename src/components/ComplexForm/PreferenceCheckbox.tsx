interface PreferenceCheckboxProps {
  preference: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PreferenceCheckbox: React.FC<PreferenceCheckboxProps> = ({
  preference,
  checked,
  onChange,
}) => (
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-5 w-5 text-blue-600"
    />
    <span className="ml-2">{preference}</span>
  </label>
);
