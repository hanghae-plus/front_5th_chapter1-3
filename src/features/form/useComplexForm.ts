import { useState } from "react";
import { useCallback } from "../../@lib";
import { useNotificationContext } from "../notification/NotificationContext";

export const useComplexForm = () => {
  const { addNotification } = useNotificationContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    preferences: [] as string[],
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseInt(value) || 0 : value,
      }));
    },
    [],
  );

  const handlePreferenceToggle = useCallback((pref: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification("폼이 성공적으로 제출되었습니다", "success");
  };

  return {
    formData,
    handleInputChange,
    handlePreferenceToggle,
    handleSubmit,
  };
};
