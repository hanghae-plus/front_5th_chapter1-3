import { Dispatch, SetStateAction } from "react";

// 타입 정의
export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

// AppContext 타입 정의
export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export interface LoginContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}
export type AppContextType =
  | ThemeContextType
  | LoginContextType
  | NotificationContextType;
