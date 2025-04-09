export interface FormState {
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

type Action =
  | { type: "UPDATE_FIELD"; name: string; value: string | number }
  | { type: "TOGGLE_PREFERENCE"; preference: string };

export const initialFormState: FormState = {
  name: "",
  email: "",
  age: 0,
  preferences: [],
};

export function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]:
          action.name === "age" ? Number(action.value) || 0 : action.value,
      };
    case "TOGGLE_PREFERENCE":
      return {
        ...state,
        preferences: state.preferences.includes(action.preference)
          ? state.preferences.filter((p) => p !== action.preference)
          : [...state.preferences, action.preference],
      };
    default:
      return state;
  }
}
