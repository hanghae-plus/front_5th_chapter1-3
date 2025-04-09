import { memo } from "../../hocs";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

export const Input: React.FC<InputProps> = memo(
  ({ type, name, value, onChange, placeholder, className }) => {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-300 rounded text-black ${className}`}
      />
    );
  }
);
