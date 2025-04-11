import { ReactNode } from "react";

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

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// AppContext 타입 정의
export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export type ItemListProps = {
  items: Item[];
  onAddItemsClick: () => void;
};

export interface ContextProps {
  children: ReactNode;
}
