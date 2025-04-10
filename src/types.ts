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

export type Theme = "light" | "dark";

// Context 타입 정의
export interface ContextType {
  theme: Theme;
  toggleTheme: () => void;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export type UserContextType = Pick<ContextType, "user" | "login" | "logout">;
export type ThemeContextType = Pick<ContextType, "theme" | "toggleTheme">;
export type NotificationContextType = Pick<
  ContextType,
  "notifications" | "addNotification" | "removeNotification"
>;
