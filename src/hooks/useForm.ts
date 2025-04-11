import React, { useCallback, useState } from "react";
import { useNotification } from "../context/NotificationContext";

type FormDataType = {
  name: string;
  email: string;
  age: number;
  preferences: string[];
};

export default function useForm() {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    age: 0,
    preferences: [],
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addNotification("폼이 성공적으로 제출되었습니다", "success");
    },
    [addNotification]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const handlePreferenceChange = useCallback((preference: string) => {
    setFormData((prev) => {
      const set = new Set(prev.preferences);
      if (set.has(preference)) {
        set.delete(preference);
      } else {
        set.add(preference);
      }
      return { ...prev, preferences: Array.from(set) };
    });
  }, []);

  return {
    formData,
    handleSubmit,
    handleInputChange,
    handlePreferenceChange,
  };
}
