import { useCallback, useState } from "react";
import { useNotification } from "../../../core";

export const useComplexForm = () => {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    preferences: [] as string[],
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addNotification("폼이 성공적으로 제출되었습니다", "success");
    },
    [addNotification],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value) || 0 : value,
      }));
    },
    [],
  );

  const handlePreferenceChange = useCallback((preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  }, []);

  return {
    formData,
    handleSubmit,
    handleInputChange,
    handlePreferenceChange,
  };
};
