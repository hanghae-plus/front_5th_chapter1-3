/* eslint-disable prettier/prettier */
import { useState } from "react";
import { renderLog } from "@/utils";
import { useNotification } from "@/context/NotificationContext";
import { memo, useCallback } from "@/@lib";
import type { FormDataType, FormInput } from "@/types/form";

const CATEGORY = ["독서", "운동", "음악", "여행"];
const INPUTS: FormInput[] = [
  { type: "text", name: "name", placeholder: "이름" },
  { type: "email", name: "email", placeholder: "이메일" },
  { type: "number", name: "age", placeholder: "나이" },
];

const ComplexForm: React.FC = () => {
  renderLog("ComplexForm rendered");
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState<FormDataType>({
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
    [setFormData],
  );

  const handlePreferenceChange = useCallback(
    (preference: string) => {
      setFormData((prev) => ({
        ...prev,
        preferences: prev.preferences.includes(preference)
          ? prev.preferences.filter((p) => p !== preference)
          : [...prev.preferences, preference],
      }));
    },
    [setFormData],
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {INPUTS.map(({ type, name, placeholder }) => (
          <input
            type={type}
            name={name}
            key={`complex-form-input-${name}`}
            value={formData[name]}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        ))}
        <div className="space-x-4">
          {CATEGORY.map((pref) => (
            <label
              key={pref}
              className="inline-flex items-center"
            >
              <input
                type="checkbox"
                checked={formData.preferences.includes(pref)}
                onChange={() => handlePreferenceChange(pref)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{pref}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default memo(ComplexForm);
