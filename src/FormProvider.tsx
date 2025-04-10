import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNotification } from "./NotificationProvider";

interface FormData {
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

interface ContextType {
  formData: FormData;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePreferenceChange: (preference: string) => void;
}

const FormContext = createContext<ContextType | null>(null);

export const FormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    preferences: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification("폼이 성공적으로 제출되었습니다", "success");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const handlePreferenceChange = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const value = useMemo(
    () => ({
      formData,
      handleSubmit,
      handleInputChange,
      handlePreferenceChange,
    }),
    [formData, handleSubmit, handleInputChange, handlePreferenceChange],
  );
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within a FormProvider");
  return context;
};
