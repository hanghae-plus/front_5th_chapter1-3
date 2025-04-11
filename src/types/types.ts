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

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
};
