import { Theme } from "./Theme.ts";
import { User } from "./User.ts";
import { Notification } from "./Notification.ts";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}
