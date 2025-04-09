import { useReducer } from "react";
import { formReducer, initialFormState } from "./formReducer";

export function useFormReducer() {
  const [formData, dispatch] = useReducer(formReducer, initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handlePreferenceChange = (preference: string) => {
    dispatch({ type: "TOGGLE_PREFERENCE", preference });
  };

  return {
    formData,
    handleInputChange,
    handlePreferenceChange,
  };
}
