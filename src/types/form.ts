export interface FormDataType {
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

export interface FormInput {
  type: string;
  name: keyof FormDataType;
  placeholder: string;
}
