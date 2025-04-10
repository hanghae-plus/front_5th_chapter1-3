// 타입 정의
interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

//ThemeContext 타입
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

//AuthContext 타입
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

//NotificationContext 타입
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export type {
  AuthContextType,
  Item,
  Notification,
  NotificationContextType,
  ThemeContextType,
  User,
};
